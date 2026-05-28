'use client'

import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

import type { Dividend2025Data, RankRow, SpotResponse } from '../lib/types'

const PAGE_SIZE = 20

const SECTOR_FILTERS = [
  { id: 'all', label: '全部' },
  { id: 'bank', label: '银行', pattern: /银行|农商行/ },
  {
    id: 'liquor',
    label: '白酒',
    pattern:
      /酒业|白酒|黄酒|啤酒|葡萄酒|茅台|五粮液|泸州|汾酒|洋河|古井|今世缘|口子窖|酒鬼|水井坊|迎驾|老白干|金徽|伊力特|舍得|贡酒|西凤|张裕|会稽山|古越龙山/
  },
  { id: 'securities', label: '证券', pattern: /证券|期货/ },
  { id: 'insurance', label: '保险', pattern: /保险/ },
  { id: 'coal', label: '煤炭', pattern: /煤炭|煤业|焦炭|焦煤|焦能/ },
  { id: 'power', label: '电力', pattern: /电力|水电|火电|风电|核电|光伏/ },
  { id: 'pharma', label: '医药', pattern: /医药|制药|药业|生物|医疗/ },
  {
    id: 'transport',
    label: '交运',
    pattern: /高速|公路|港口|机场|航空|铁路|航运|海运|物流|港务|空港/
  },
  { id: 'steel', label: '钢铁', pattern: /钢铁|特钢|钢材/ },
  { id: 'petro', label: '石油石化', pattern: /石油|石化|油气|海油|油田/ }
] as const

type SectorFilter = (typeof SECTOR_FILTERS)[number]['id']

function matchSector(name: string, sector: SectorFilter): boolean {
  if (sector === 'all') return true
  const rule = SECTOR_FILTERS.find((item) => item.id === sector)
  if (!rule || !('pattern' in rule)) return false
  return rule.pattern.test(name)
}

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
  const [prices, setPrices] = useState<SpotResponse['prices']>({})
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [sector, setSector] = useState<SectorFilter>('all')

  const rows = useMemo(
    () => (loading || error ? [] : buildRankList(dividend, prices)),
    [dividend, prices, loading, error]
  )

  const rankByCode = useMemo(() => {
    const map = new Map<string, number>()
    rows.forEach((row, index) => map.set(row.code, index + 1))
    return map
  }, [rows])

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((row) => {
      if (!matchSector(row.name, sector)) return false
      if (!q) return true
      return row.code.includes(q) || row.name.toLowerCase().includes(q)
    })
  }, [rows, query, sector])

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

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE))
  const pageRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredRows.slice(start, start + PAGE_SIZE)
  }, [filteredRows, page])

  useEffect(() => {
    setPage(1)
  }, [query, sector])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const showPager = !loading && !error && filteredRows.length > 0
  const filtering = sector !== 'all' || query.trim().length > 0

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background">
      <div className="shrink-0 border-b border-border/50 bg-card/75 px-4 py-2 backdrop-blur-xl">
        {!loading && !error ? (
          <>
            <p className="text-sm text-muted-foreground">
              全榜可计算{' '}
              <span className="font-medium tabular-nums text-foreground">{rows.length}</span> 只
              {filtering ? (
                <>
                  {' '}
                  · 当前{' '}
                  <span className="font-medium tabular-nums text-foreground">
                    {filteredRows.length}
                  </span>{' '}
                  只
                </>
              ) : null}
            </p>
            <div
              className="mt-2 flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none"
              role="tablist"
              aria-label="板块筛选"
            >
              {SECTOR_FILTERS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={sector === id}
                  onClick={() => setSector(id)}
                  className={cn(
                    'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
                    sector === id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索代码或名称，如 茅台、600519"
              className="mt-2 w-full rounded-xl border border-border/80 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70"
            />
          </>
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
        ) : filteredRows.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {rows.length === 0 ? '暂无匹配数据' : '没有符合筛选条件的股票'}
          </p>
        ) : (
          <ul className="flex flex-col gap-2 pb-1">
            {pageRows.map((row) => {
              const rank = rankByCode.get(row.code) ?? 0
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
            <span className="text-center text-sm tabular-nums text-muted-foreground">
              第 {page} / {totalPages} 页{filtering ? ` · ${filteredRows.length} 条` : ''}
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
