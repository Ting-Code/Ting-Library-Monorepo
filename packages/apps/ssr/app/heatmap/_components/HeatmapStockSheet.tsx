'use client'

import { ExternalLink, X } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { StockRect } from '../lib/treemap'

function formatChange(value: number) {
  if (value > 0) {
    return `+${value.toFixed(2)}%`
  }
  return `${value.toFixed(2)}%`
}

function toXueqiuSymbol(code: string) {
  const [symbol, market] = code.split('.')
  return `${market}${symbol}`
}

export function HeatmapStockSheet({
  stock,
  onClose
}: {
  stock: StockRect | null
  onClose: () => void
}) {
  if (!stock) {
    return null
  }

  const isRise = stock.changePct > 0.09
  const isFall = stock.changePct < -0.09

  return (
    <>
      <button
        type="button"
        aria-label="关闭详情"
        className="fixed inset-0 z-40 bg-black/45"
        onClick={onClose}
      />
      <section
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[430px]',
          'rounded-t-2xl border border-border bg-card px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-xl'
        )}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-foreground">{stock.name}</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {stock.code} · {stock.boardName}
            </p>
          </div>
          <button
            type="button"
            aria-label="关闭"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border text-muted-foreground"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">最新价</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
              {stock.price.toFixed(stock.price >= 100 ? 1 : 2)}
            </p>
          </div>
          <p
            className={cn(
              'text-xl font-semibold tabular-nums',
              isRise && 'text-red-500',
              isFall && 'text-emerald-500',
              !isRise && !isFall && 'text-muted-foreground'
            )}
          >
            {formatChange(stock.changePct)}
          </p>
        </div>

        <a
          href={`https://xueqiu.com/S/${toXueqiuSymbol(stock.code)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-medium text-foreground"
        >
          在雪球查看
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
      </section>
    </>
  )
}
