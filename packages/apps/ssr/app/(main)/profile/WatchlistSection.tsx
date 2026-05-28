'use client'

import { ChevronRight, Star } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getWatchlist } from '@/lib/watchlist'
import type { WatchlistItem } from '@/lib/watchlist'
import { cn } from '@/lib/utils'

export function WatchlistSection() {
  const [items, setItems] = useState<WatchlistItem[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const refresh = () => setItems(getWatchlist())
    refresh()
    setReady(true)
    window.addEventListener('watchlist-changed', refresh)
    return () => window.removeEventListener('watchlist-changed', refresh)
  }, [])

  if (!ready) {
    return (
      <div className="flex flex-1 items-center justify-center py-16">
        <span className="sr-only">加载中</span>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Star className="h-8 w-8 text-muted-foreground" strokeWidth={1.75} aria-hidden />
        </span>
        <p className="mt-4 text-base font-medium text-foreground">暂无自选</p>
        <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-muted-foreground">
          在 K 线页点击「加自选」，或从股息率排行进入个股后添加，即可在此查看。
        </p>
        <Link
          href="/"
          className="mt-6 min-h-11 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground active:bg-muted"
        >
          去首页看看
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-2">
      <p className="mb-2 px-1 text-xs text-muted-foreground">共 {items.length} 只</p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.code}>
            <Link
              href={`/kline/${item.code}?name=${encodeURIComponent(item.name)}`}
              className={cn(
                'flex items-center gap-3 rounded-2xl border border-border/80 bg-card px-4 py-3',
                'shadow-[0_1px_2px_rgba(15,23,42,0.04)] active:scale-[0.99] active:bg-muted/40',
                'dark:shadow-[0_1px_2px_rgba(0,0,0,0.2)]'
              )}
            >
              <Star className="h-4 w-4 shrink-0 fill-primary text-primary" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-semibold text-foreground">
                  {item.name}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{item.code}</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/70" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
