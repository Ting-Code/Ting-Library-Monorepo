'use client'

import { Loader2, Star } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import { fetchKlineSnapshot } from '../lib/client-fetch'
import type { MarketSnapshot } from '../lib/fetch-market'
import type { KlinePeriodId } from '../lib/periods'
import type { Bar, QuoteSnapshot } from '../lib/types'
import { isInWatchlist, toggleWatchlist } from '@/lib/watchlist'

import { KlineChartPane, useKlineChart } from './KlineChartPane'
import { KlinePeriodTabs } from './KlinePeriodTabs'
import { KlineQuoteHeader } from './KlineQuoteHeader'

export function KlineApp({ code, name }: { code: string; name?: string }) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [chartReady, setChartReady] = useState(false)
  const onChartReady = useCallback(() => setChartReady(true), [])
  const { applyBars } = useKlineChart(chartContainerRef, onChartReady)

  const [period, setPeriod] = useState<KlinePeriodId>('1d')
  const [quote, setQuote] = useState<QuoteSnapshot | null>(null)
  const [bars, setBars] = useState<Bar[]>([])
  const [displayName, setDisplayName] = useState(name?.trim() || code)
  const [watched, setWatched] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setWatched(isInWatchlist(code))
    const onWatchlistChange = () => setWatched(isInWatchlist(code))
    window.addEventListener('watchlist-changed', onWatchlistChange)
    return () => window.removeEventListener('watchlist-changed', onWatchlistChange)
  }, [code])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchKlineSnapshot(code, period, name)
      const data = (await res.json()) as MarketSnapshot & { error?: string }

      if (!res.ok || data.error) {
        throw new Error(data.error ?? `加载失败 (${res.status})`)
      }

      setQuote(data.quote)
      setDisplayName(name?.trim() || data.quote.name || data.kline.name)
      setBars(data.kline.bars)
      applyBars(data.kline.bars)
    } catch (e) {
      setError(e instanceof Error ? e.message : '加载失败')
    } finally {
      setLoading(false)
    }
  }, [applyBars, code, name, period])

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    if (chartReady && bars.length > 0) {
      applyBars(bars)
    }
  }, [chartReady, bars, applyBars])

  const handleToggleWatch = () => {
    const next = toggleWatchlist({ code, name: displayName })
    setWatched(next)
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <KlineQuoteHeader code={code} name={displayName} quote={quote} />

      <KlinePeriodTabs value={period} onChange={setPeriod} disabled={loading} />

      <div className="relative min-h-0 flex-1 bg-card">
        <KlineChartPane containerRef={chartContainerRef} />

        {loading && bars.length === 0 ? (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-card/60">
            <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" aria-hidden />
          </div>
        ) : null}

        {error ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-card/95 px-6 text-center">
            <p className="text-sm text-warning">{error}</p>
            <button
              type="button"
              onClick={() => void load()}
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
            >
              重试
            </button>
          </div>
        ) : null}
      </div>

      <footer className="flex shrink-0 items-center gap-2 border-t border-border/70 bg-card px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={handleToggleWatch}
          className={cn(
            'flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-colors active:bg-muted',
            watched ? 'text-primary' : 'text-foreground'
          )}
        >
          <Star className={cn('h-4 w-4', watched && 'fill-current text-primary')} aria-hidden />
          {watched ? '删自选' : '加自选'}
        </button>
      </footer>
    </div>
  )
}
