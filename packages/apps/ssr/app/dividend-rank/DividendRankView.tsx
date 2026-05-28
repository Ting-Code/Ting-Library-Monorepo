'use client'

import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

import type { Dividend2025Data, RankRow, SpotResponse } from './types'

const PAGE_SIZE = 20

function buildRankList(dividend: Dividend2025Data, prices: SpotResponse['prices']): RankRow[] {
  const rows: RankRow[] = []
  for (const [code, name, dps] of dividend.items) {
    const spot = prices[code]
    if (!spot?.price || dps <= 0) continue
    rows.push({
      code,
      name: name || spot.name,
      price: spot.price,
      dps,
      yieldPct: (dps / spot.price) * 100
    })
  }
  rows.sort((a, b) => b.yieldPct - a.yieldPct)
  return rows
}

export function DividendRankView({ dividend }: { dividend: Dividend2025Data }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [spotAt, setSpotAt] = useState<string | null>(null)
  const [spotMeta, setSpotMeta] = useState<{
    source?: string
    matched: number
    dividendCount: number
    priceType?: string
  } | null>(null)
  const [prices, setPrices] = useState<SpotResponse['prices']>({})
  const [page, setPage] = useState(1)

  const rows = useMemo(
    () => (loading || error ? [] : buildRankList(dividend, prices)),
    [dividend, prices, loading, error]
  )

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/dividend-rank/spot', { cache: 'no-store' })
      const data = (await res.json()) as SpotResponse & { error?: string }
      if (!res.ok || data.error) {
        throw new Error(data.error ?? `请求失败 ${res.status}`)
      }
      setPrices(data.prices)
      setSpotAt(data.updatedAt)
      setSpotMeta({
        source: data.source,
        matched: data.count,
        dividendCount: data.dividendCount ?? dividend.items.length,
        priceType: data.priceType
      })
      setPage(1)
    } catch (e) {
      setError(e instanceof Error ? e.message : '加载行情失败')
      setPrices({})
    } finally {
      setLoading(false)
    }
  }, [dividend.items.length])

  useEffect(() => {
    void load()
  }, [load])

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE))
  const pageRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return rows.slice(start, start + PAGE_SIZE)
  }, [rows, page])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const spotTime =
    spotAt &&
    new Date(spotAt).toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      hour: '2-digit',
      minute: '2-digit'
    })

  const showPager = !loading && !error && rows.length > 0

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background">
      <div className="shrink-0 border-b border-border/50 bg-card/75 px-4 py-2 backdrop-blur-xl">
        <p className="text-xs leading-relaxed text-muted-foreground">
          2025 年报每股现金分红 ÷ 最新价（盘中现价 / 休市收盘价）。报告期 {dividend.reportDate}
          {spotTime ? ` · 行情 ${spotTime}` : ''}
        </p>
        {spotMeta ? (
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/90">
            一次拉取 {spotMeta.matched}/{spotMeta.dividendCount} 只 · 前端排序分页 ·{' '}
            {spotMeta.source ?? '东财 ulist'}
          </p>
        ) : null}
        {!loading && !error ? (
          <p className="mt-1.5 text-sm text-muted-foreground">
            可计算 <span className="font-medium tabular-nums text-foreground">{rows.length}</span>{' '}
            只
          </p>
        ) : null}
      </div>

      <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-3">
        {loading ? (
          <div className="flex h-full min-h-48 flex-col items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
            <span className="text-sm">正在批量拉取行情…</span>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-border/80 bg-card p-4 text-center">
            <p className="text-sm text-warning">{error}</p>
            <button
              type="button"
              onClick={() => void load()}
              className="mt-3 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              重试
            </button>
          </div>
        ) : rows.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">暂无匹配数据</p>
        ) : (
          <ul className="flex flex-col gap-2 pb-1">
            {pageRows.map((row, i) => {
              const rank = (page - 1) * PAGE_SIZE + i + 1
              return (
                <li
                  key={row.code}
                  className="rounded-2xl border border-border/80 bg-card px-3 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            'flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md px-1 text-xs font-semibold',
                            rank <= 3
                              ? 'bg-primary/15 text-primary'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {rank}
                        </span>
                        <span className="truncate text-[15px] font-semibold text-foreground">
                          {row.name}
                        </span>
                      </div>
                      <p className="mt-1 pl-8 text-xs text-muted-foreground">{row.code}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-lg font-semibold tabular-nums text-primary">
                        {row.yieldPct.toFixed(2)}%
                      </p>
                      <p className="text-[11px] text-muted-foreground">股息率</p>
                    </div>
                  </div>
                  <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 border-t border-border/60 pt-2 pl-8 text-xs">
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">最新价</dt>
                      <dd className="tabular-nums font-medium text-foreground">
                        ¥{row.price.toFixed(2)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">每股分红</dt>
                      <dd className="tabular-nums font-medium text-foreground">
                        ¥{row.dps.toFixed(4)}
                      </dd>
                    </div>
                  </dl>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {showPager ? (
        <nav
          className="z-10 shrink-0 border-t border-border/80 bg-card/95 px-4 py-2 backdrop-blur-xl pb-[max(0.5rem,env(safe-area-inset-bottom))]"
          aria-label="分页"
        >
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex min-h-10 items-center gap-0.5 rounded-lg px-2 text-sm text-foreground disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              上一页
            </button>
            <span className="text-sm tabular-nums text-muted-foreground">
              第 {page} / {totalPages} 页 · 每页 {PAGE_SIZE} 条
            </span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex min-h-10 items-center gap-0.5 rounded-lg px-2 text-sm text-foreground disabled:opacity-40"
            >
              下一页
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </nav>
      ) : null}
    </div>
  )
}
