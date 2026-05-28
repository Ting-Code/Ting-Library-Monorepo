'use client'

import { cn } from '@/lib/utils'

import { stockTextClass } from '../lib/stock-tone'
import type { QuoteSnapshot } from '../lib/types'

function formatCompact(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return '—'
  if (value >= 1e8) return `${(value / 1e8).toFixed(2)}亿`
  if (value >= 1e4) return `${(value / 1e4).toFixed(2)}万`
  return value.toFixed(0)
}

type StatCell = { label: string; value: string; tone?: 'up' | 'down' | 'neutral' }

function StatColumn({ cells }: { cells: StatCell[] }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      {cells.map(({ label, value, tone }) => (
        <div
          key={label}
          className="flex items-baseline justify-between gap-1 text-[11px] leading-tight"
        >
          <span className="shrink-0 text-muted-foreground">{label}</span>
          <span
            className={cn(
              'truncate text-right font-medium tabular-nums',
              tone === 'up' && 'text-stock-up',
              tone === 'down' && 'text-stock-down',
              (!tone || tone === 'neutral') && 'text-foreground'
            )}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function KlineQuoteHeader({
  quote
}: {
  code: string
  name: string
  quote: QuoteSnapshot | null
}) {
  const price = quote?.price ?? 0
  const change = quote?.change ?? 0
  const changePct = quote?.changePct ?? 0
  const prevClose = quote ? price - change : 0

  const col1: StatCell[] = quote
    ? [
        {
          label: '高',
          value: quote.high.toFixed(2),
          tone: quote.high >= prevClose ? 'up' : 'down'
        },
        { label: '低', value: quote.low.toFixed(2), tone: quote.low >= prevClose ? 'up' : 'down' },
        { label: '开', value: quote.open.toFixed(2), tone: quote.open >= prevClose ? 'up' : 'down' }
      ]
    : [
        { label: '高', value: '—' },
        { label: '低', value: '—' },
        { label: '开', value: '—' }
      ]

  const col2: StatCell[] = quote
    ? [
        { label: '额', value: formatCompact(quote.amount) },
        { label: '量', value: formatCompact(quote.volume) },
        { label: '昨收', value: prevClose.toFixed(2) }
      ]
    : [
        { label: '额', value: '—' },
        { label: '量', value: '—' },
        { label: '昨收', value: '—' }
      ]

  const col3: StatCell[] = quote
    ? [
        {
          label: '振幅',
          value:
            prevClose > 0 ? `${(((quote.high - quote.low) / prevClose) * 100).toFixed(2)}%` : '—'
        },
        {
          label: '涨跌',
          value: `${change > 0 ? '+' : ''}${change.toFixed(2)}`,
          tone: change > 0.001 ? 'up' : change < -0.001 ? 'down' : 'neutral'
        },
        {
          label: '涨幅',
          value: `${changePct > 0 ? '+' : ''}${changePct.toFixed(2)}%`,
          tone: change > 0.001 ? 'up' : change < -0.001 ? 'down' : 'neutral'
        }
      ]
    : [
        { label: '振幅', value: '—' },
        { label: '涨跌', value: '—' },
        { label: '涨幅', value: '—' }
      ]

  return (
    <section className="shrink-0 border-b border-border/70 bg-card px-3 py-2.5">
      {quote ? (
        <div className="flex gap-3">
          <div className="w-[38%] shrink-0 pt-0.5">
            <p
              className={cn(
                'text-[2rem] font-semibold tabular-nums leading-none tracking-tight',
                stockTextClass(change)
              )}
            >
              {price.toFixed(2)}
            </p>
            <p className={cn('mt-1.5 text-sm font-semibold tabular-nums', stockTextClass(change))}>
              <span>
                {change > 0 ? '+' : ''}
                {change.toFixed(2)}
              </span>
              <span className="ml-2">
                {changePct > 0 ? '+' : ''}
                {changePct.toFixed(2)}%
              </span>
            </p>
          </div>
          <div className="flex min-w-0 flex-1 gap-2 border-l border-border/50 pl-3">
            <StatColumn cells={col1} />
            <StatColumn cells={col2} />
            <StatColumn cells={col3} />
          </div>
        </div>
      ) : (
        <div className="flex gap-3" aria-hidden>
          <div className="w-[38%] space-y-2">
            <div className="h-9 w-24 animate-pulse rounded bg-muted" />
            <div className="h-4 w-28 animate-pulse rounded bg-muted/80" />
          </div>
          <div className="flex flex-1 gap-2 border-l border-border/50 pl-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-1 flex-col gap-2">
                {Array.from({ length: 3 }).map((__, j) => (
                  <div key={j} className="h-3 animate-pulse rounded bg-muted/80" />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
