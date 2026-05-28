'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { MARKET_LABELS, MARKET_OPTIONS, PERIOD_LABELS, PERIOD_OPTIONS } from '../lib/constants'
import type { HeatmapPeriodKey, MarketKey } from '../lib/server/market-heatmap'

function ScrollChipRow({
  activeId,
  ariaLabel,
  children
}: {
  activeId: string
  ariaLabel: string
  children: (refs: { setActiveRef: (node: HTMLButtonElement | null) => void }) => ReactNode
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const node = activeRef.current
    const scroller = scrollerRef.current
    if (!node || !scroller) {
      return
    }

    const nodeLeft = node.offsetLeft
    const nodeWidth = node.offsetWidth
    const scrollerWidth = scroller.clientWidth
    const targetScroll = nodeLeft - (scrollerWidth - nodeWidth) / 2

    scroller.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: 'smooth'
    })
  }, [activeId])

  return (
    <div className="relative -mx-3 mt-2">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 bg-gradient-to-r from-card/95 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-4 bg-gradient-to-l from-card/95 to-transparent"
        aria-hidden
      />
      <div
        ref={scrollerRef}
        className={cn(
          'flex gap-1.5 overflow-x-auto overscroll-x-contain px-3 pb-1',
          'scroll-smooth snap-x snap-mandatory touch-pan-x',
          '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        )}
        role="tablist"
        aria-label={ariaLabel}
      >
        {children({
          setActiveRef: (node) => {
            activeRef.current = node
          }
        })}
      </div>
    </div>
  )
}

export function HeatmapToolbar({
  market,
  period,
  updatedAt,
  advanceCount,
  flatCount,
  declineCount,
  onMarketChange,
  onPeriodChange
}: {
  market: MarketKey
  period: HeatmapPeriodKey
  updatedAt: string
  advanceCount: number
  flatCount: number
  declineCount: number
  onMarketChange: (market: MarketKey) => void
  onPeriodChange: (period: HeatmapPeriodKey) => void
}) {
  const timeText = updatedAt
    ? new Date(updatedAt).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    : '--:--'

  return (
    <div className="shrink-0 border-b border-border/60 bg-card/90 px-3 py-2 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-[11px] leading-tight text-muted-foreground">
        <span className="min-w-0 tabular-nums">
          涨 <span className="font-semibold text-red-500">{advanceCount}</span>
          <span className="mx-1 text-border">·</span>平{' '}
          <span className="font-semibold text-foreground">{flatCount}</span>
          <span className="mx-1 text-border">·</span>跌{' '}
          <span className="font-semibold text-emerald-500">{declineCount}</span>
        </span>
        <span className="shrink-0 tabular-nums">更新 {timeText}</span>
      </div>

      <ScrollChipRow activeId={market} ariaLabel="市场范围">
        {({ setActiveRef }) =>
          MARKET_OPTIONS.map((option) => {
            const active = market === option
            return (
              <button
                key={option}
                ref={active ? setActiveRef : undefined}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onMarketChange(option)}
                className={cn(
                  'min-h-9 shrink-0 snap-start whitespace-nowrap rounded-full border px-2.5 text-[12px] font-medium transition-colors',
                  active
                    ? 'border-primary/40 bg-primary/12 text-foreground'
                    : 'border-border bg-background text-muted-foreground'
                )}
              >
                {MARKET_LABELS[option]}
              </button>
            )
          })
        }
      </ScrollChipRow>

      <div className="mt-2 flex gap-1" role="tablist" aria-label="涨跌周期">
        {PERIOD_OPTIONS.map((option) => {
          const active = period === option
          return (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onPeriodChange(option)}
              className={cn(
                'min-h-9 min-w-0 flex-1 rounded-lg border text-[13px] font-semibold transition-colors',
                active
                  ? 'border-primary/50 bg-primary/15 text-foreground'
                  : 'border-border bg-background text-muted-foreground'
              )}
            >
              {PERIOD_LABELS[option]}
            </button>
          )
        })}
      </div>
    </div>
  )
}
