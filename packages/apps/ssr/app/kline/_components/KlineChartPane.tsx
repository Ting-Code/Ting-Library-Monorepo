'use client'

import { dispose, init } from 'klinecharts'
import type { Chart, KLineData } from 'klinecharts'
import { useCallback, useEffect, useRef } from 'react'
import type { RefObject } from 'react'

import { applyChartLayout, getKlineChartStyles } from '../lib/chart-styles'
import type { Bar } from '../lib/types'

function toKLineData(bars: Bar[]): KLineData[] {
  return bars.map((bar) => ({
    timestamp: bar.time * 1000,
    open: bar.open,
    high: bar.high,
    low: bar.low,
    close: bar.close,
    volume: bar.volume
  }))
}

export function useKlineChart(
  containerRef: RefObject<HTMLDivElement | null>,
  onReady?: () => void
) {
  const chartRef = useRef<Chart | null>(null)
  const pendingBarsRef = useRef<Bar[] | null>(null)

  const applyTheme = useCallback((chart: Chart) => {
    chart.setStyles(getKlineChartStyles() as Parameters<Chart['setStyles']>[0])
    applyChartLayout(chart)
  }, [])

  const paintBars = useCallback((chart: Chart, bars: Bar[]) => {
    if (bars.length === 0) return
    chart.applyNewData(toKLineData(bars))
    requestAnimationFrame(() => {
      chart.resize()
      try {
        chart.scrollToRealTime?.()
      } catch {
        /* 部分版本无此方法 */
      }
    })
  }, [])

  const applyBars = useCallback(
    (bars: Bar[]) => {
      pendingBarsRef.current = bars
      const chart = chartRef.current
      if (!chart) return
      paintBars(chart, bars)
    },
    [paintBars]
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let chart: Chart | null = null

    const initChart = () => {
      if (!container || chartRef.current) return
      const rect = container.getBoundingClientRect()
      if (rect.width < 1 || rect.height < 1) return

      chart = init(container, {
        styles: getKlineChartStyles() as Parameters<Chart['setStyles']>[0]
      })
      if (!chart) return

      chartRef.current = chart
      applyTheme(chart)
      chart.createIndicator('MA', true)
      chart.createIndicator('VOL', false, { height: 64 })
      applyChartLayout(chart)

      if (pendingBarsRef.current?.length) {
        paintBars(chart, pendingBarsRef.current)
      }

      onReady?.()
    }

    initChart()

    const resize = () => chartRef.current?.resize()
    const ro = new ResizeObserver(() => {
      if (!chartRef.current) {
        initChart()
      } else {
        resize()
      }
    })
    ro.observe(container)

    const onThemeChange = () => {
      if (chartRef.current) applyTheme(chartRef.current)
    }
    const observer = new MutationObserver(onThemeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => {
      observer.disconnect()
      ro.disconnect()
      if (chart) dispose(chart)
      chartRef.current = null
    }
  }, [applyTheme, containerRef, onReady, paintBars])

  return { applyBars }
}

export function KlineChartPane({
  containerRef
}: {
  containerRef: RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full touch-none"
      style={{ minHeight: 240 }}
    />
  )
}
