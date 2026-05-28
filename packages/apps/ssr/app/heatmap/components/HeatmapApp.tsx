'use client'

import { Loader2, RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import { HeatmapStockSheet } from './HeatmapStockSheet'
import { HeatmapToolbar } from './HeatmapToolbar'
import { fetchQuotes, fetchTreemap } from '../lib/client-api'
import { REFRESH_INTERVAL_MS } from '../lib/constants'
import { getLegendGradient, renderHeatmapCanvas } from '../lib/canvas'
import type { HeatmapPeriodKey, MarketKey, TreemapResponse } from '../lib/server/market-heatmap'
import { buildHeatmapLayout, mergeQuotes, quotesFromTreemap } from '../lib/treemap'
import type { QuoteMap, StockRect } from '../lib/treemap'
import { useHeatmapGestures } from '../lib/use-heatmap-gestures'

export function HeatmapApp() {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const stockRectsRef = useRef<StockRect[]>([])

  const [market, setMarket] = useState<MarketKey>('all')
  const [period, setPeriod] = useState<HeatmapPeriodKey>('day')
  const [treemapData, setTreemapData] = useState<TreemapResponse | null>(null)
  const [quotes, setQuotes] = useState<QuoteMap>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatedAt, setUpdatedAt] = useState('')
  const [canvasSize, setCanvasSize] = useState({ width: 360, height: 480 })
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 })
  const [selectedStockCode, setSelectedStockCode] = useState<string | null>(null)

  const legendGradient = useMemo(() => getLegendGradient('red-rise'), [])

  const refreshSize = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) {
      return
    }

    const nextWidth = Math.max(280, Math.floor(viewport.clientWidth))
    const nextHeight = Math.max(320, Math.floor(viewport.clientHeight))

    setCanvasSize((current) => {
      if (current.width === nextWidth && current.height === nextHeight) {
        return current
      }
      return { width: nextWidth, height: nextHeight }
    })
  }, [])

  const layout = useMemo(() => {
    if (!treemapData) {
      return { stockRects: [], boardRects: [], subBoardRects: [] }
    }
    return buildHeatmapLayout(treemapData.nodes, quotes, canvasSize.width, canvasSize.height)
  }, [canvasSize.height, canvasSize.width, quotes, treemapData])

  useEffect(() => {
    stockRectsRef.current = layout.stockRects
  }, [layout.stockRects])

  const selectedStock = useMemo(
    () => layout.stockRects.find((stock) => stock.code === selectedStockCode) ?? null,
    [layout.stockRects, selectedStockCode]
  )

  const loadTreemap = useCallback(async (nextMarket: MarketKey, nextPeriod: HeatmapPeriodKey) => {
    const payload = await fetchTreemap(nextMarket, nextPeriod)
    setTreemapData(payload)
    setQuotes(quotesFromTreemap(payload))
    setUpdatedAt(payload.updatedAt)
  }, [])

  const loadQuotes = useCallback(async (nextMarket: MarketKey, nextPeriod: HeatmapPeriodKey) => {
    const payload = await fetchQuotes(nextMarket, nextPeriod)
    setQuotes((current) => mergeQuotes(current, payload.quotes))
    setUpdatedAt(payload.updatedAt)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function run() {
      setLoading(true)
      setError(null)
      setSelectedStockCode(null)
      setView({ scale: 1, x: 0, y: 0 })

      try {
        await loadTreemap(market, period)
      } catch {
        if (!cancelled) {
          setError('热力图数据加载失败，请稍后重试')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [loadTreemap, market, period])

  useEffect(() => {
    const timer = window.setInterval(() => {
      void loadQuotes(market, period).catch(() => {
        /* keep last quotes on refresh failure */
      })
    }, REFRESH_INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [loadQuotes, market, period])

  useEffect(() => {
    refreshSize()
    const viewport = viewportRef.current
    const observer =
      viewport && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => refreshSize())
        : null

    if (viewport) {
      observer?.observe(viewport)
    }
    window.addEventListener('resize', refreshSize, { passive: true })

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', refreshSize)
    }
  }, [refreshSize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || loading) {
      return
    }

    renderHeatmapCanvas(canvas, layout, canvasSize, {
      view,
      highlightedStock: selectedStock,
      activeBoardName: selectedStock?.boardName ?? null,
      activeSubBoardName: selectedStock?.subBoardName || null
    })
  }, [canvasSize, layout, loading, selectedStock, view])

  const toWorldPoint = useCallback(
    (screenX: number, screenY: number) => ({
      x: (screenX - view.x) / view.scale,
      y: (screenY - view.y) / view.scale
    }),
    [view.scale, view.x, view.y]
  )

  const pickStock = useCallback((worldX: number, worldY: number) => {
    for (let index = stockRectsRef.current.length - 1; index >= 0; index -= 1) {
      const stock = stockRectsRef.current[index]
      if (
        worldX >= stock.x &&
        worldX <= stock.x + stock.width &&
        worldY >= stock.y &&
        worldY <= stock.y + stock.height
      ) {
        return stock
      }
    }
    return null
  }, [])

  const handleCanvasTap = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current
      if (!canvas) {
        return
      }

      const bounds = canvas.getBoundingClientRect()
      const world = toWorldPoint(clientX - bounds.left, clientY - bounds.top)
      const stock = pickStock(world.x, world.y)
      setSelectedStockCode(stock?.code ?? null)
    },
    [pickStock, toWorldPoint]
  )

  useHeatmapGestures({
    targetRef: viewportRef,
    canvasRef,
    canvasSize,
    view,
    onViewChange: setView,
    onTap: handleCanvasTap
  })

  const resetView = useCallback(() => {
    setView({ scale: 1, x: 0, y: 0 })
    setSelectedStockCode(null)
  }, [])

  const summary = treemapData?.summary
  const isZoomed = view.scale > 1.02
  const zoomPercent = Math.round(view.scale * 100)

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background">
      <HeatmapToolbar
        market={market}
        period={period}
        updatedAt={updatedAt}
        advanceCount={summary?.advanceCount ?? 0}
        flatCount={summary?.flatCount ?? 0}
        declineCount={summary?.declineCount ?? 0}
        onMarketChange={setMarket}
        onPeriodChange={setPeriod}
      />

      <div
        className="mx-3 mt-2 h-1.5 shrink-0 rounded-full"
        style={{ background: legendGradient }}
        aria-hidden
      />

      <div
        ref={viewportRef}
        className="relative mt-2 min-h-0 flex-1 touch-none overscroll-none px-3 pb-3"
        style={{ touchAction: 'none' }}
      >
        {loading ? (
          <div className="flex h-full min-h-[320px] items-center justify-center text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
            <span className="sr-only">加载中</span>
          </div>
        ) : error ? (
          <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 px-4 text-center">
            <p className="text-sm text-muted-foreground">{error}</p>
            <button
              type="button"
              onClick={() => {
                void loadTreemap(market, period).catch(() =>
                  setError('热力图数据加载失败，请稍后重试')
                )
              }}
              className="min-h-11 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground"
            >
              重新加载
            </button>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="h-full w-full touch-none rounded-xl border border-border/70"
            style={{ touchAction: 'none' }}
            aria-label="A 股市场热力图，支持双指缩放与拖动"
          />
        )}

        {!loading && !error ? (
          <>
            {isZoomed ? (
              <span
                className="absolute left-5 top-3 z-10 rounded-full border border-border bg-card/90 px-2 py-0.5 text-[11px] font-medium tabular-nums text-muted-foreground backdrop-blur-sm"
                aria-live="polite"
              >
                {zoomPercent}%
              </span>
            ) : null}
            <button
              type="button"
              onClick={resetView}
              className={cn(
                'absolute bottom-5 right-5 z-10 inline-flex min-h-11 min-w-11 items-center justify-center',
                'rounded-full border border-border bg-card/95 text-foreground shadow-md backdrop-blur-sm',
                isZoomed && 'ring-1 ring-primary/30'
              )}
              aria-label="重置缩放"
            >
              <RotateCcw className="h-5 w-5" aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      <HeatmapStockSheet stock={selectedStock} onClose={() => setSelectedStockCode(null)} />
    </div>
  )
}
