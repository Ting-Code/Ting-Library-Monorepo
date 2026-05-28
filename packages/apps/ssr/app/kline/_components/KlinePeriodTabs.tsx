'use client'

import { cn } from '@/lib/utils'

import { KLINE_PERIODS } from '../lib/periods'
import type { KlinePeriodId } from '../lib/periods'

export function KlinePeriodTabs({
  value,
  onChange,
  disabled
}: {
  value: KlinePeriodId
  onChange: (period: KlinePeriodId) => void
  disabled?: boolean
}) {
  return (
    <div
      className="flex shrink-0 items-center border-b border-border/70 bg-card"
      role="tablist"
      aria-label="K 线周期"
    >
      {KLINE_PERIODS.map((item) => {
        const active = value === item.id
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={disabled}
            onClick={() => onChange(item.id)}
            className={cn(
              'relative min-h-10 flex-1 px-1 text-sm font-medium transition-colors disabled:opacity-50',
              active ? 'text-stock-up' : 'text-muted-foreground active:bg-muted/60'
            )}
          >
            {item.label}
            {active ? (
              <span
                className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-stock-up"
                aria-hidden
              />
            ) : null}
          </button>
        )
      })}
      <span className="shrink-0 px-2 text-[10px] text-muted-foreground">前复权</span>
    </div>
  )
}
