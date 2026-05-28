import { fetchEastmoneyUlistJson } from '@/lib/eastmoney-fetch'
import { fetchSinaQuote } from '@/lib/sina-quote'

import { fetchKlineWithFallback } from './kline-providers'
import type { KlineSource } from './kline-providers'
import { getPeriodConfig } from './periods'
import type { KlinePeriodId } from './periods'
import { quoteFromBars } from './quote-from-bars'
import {
  getCachedSnapshot,
  getInflightSnapshot,
  isSnapshotFresh,
  setCachedSnapshot,
  setInflightSnapshot,
  snapshotCacheKey
} from './snapshot-cache'
import { isAshareCode, toSecId } from './secid'
import type { KlineResponse, QuoteSnapshot } from './types'

type EastMoneyUlistJson = {
  rc?: number
  data?: {
    diff?: {
      f12?: string
      f14?: string
      f2?: number
      f3?: number
      f4?: number
      f5?: number
      f6?: number
      f15?: number
      f16?: number
      f17?: number
    }[]
  }
}

export type MarketSnapshot = {
  quote: QuoteSnapshot
  kline: KlineResponse
  meta: {
    quoteSource: 'eastmoney' | 'sina' | 'kline'
    klineSource: KlineSource
    stale?: boolean
  }
}

async function fetchEastmoneyQuote(code: string): Promise<QuoteSnapshot | null> {
  const qs = new URLSearchParams({
    fltt: '2',
    invt: '2',
    fields: 'f12,f14,f2,f3,f4,f5,f6,f15,f16,f17',
    ut: 'bd1d9ddb04089700cf9c27f6f7426281',
    secids: toSecId(code)
  })

  try {
    const json = await fetchEastmoneyUlistJson<EastMoneyUlistJson>(qs, (data) => {
      return data.rc === 0 && Boolean(data.data?.diff?.[0]?.f2)
    })
    const row = json.data?.diff?.[0]
    const price = Number(row?.f2)
    if (json.rc !== 0 || !row || !price) return null

    return {
      code,
      name: row.f14?.trim() || code,
      price,
      change: Number(row.f4) || 0,
      changePct: Number(row.f3) || 0,
      open: Number(row.f17) || 0,
      high: Number(row.f15) || 0,
      low: Number(row.f16) || 0,
      volume: Number(row.f5) || 0,
      amount: Number(row.f6) || 0,
      updatedAt: new Date().toISOString()
    }
  } catch {
    return null
  }
}

async function resolveQuote(
  code: string,
  fallbackName: string,
  bars: KlineResponse['bars']
): Promise<{ quote: QuoteSnapshot; quoteSource: MarketSnapshot['meta']['quoteSource'] }> {
  const sina = await fetchSinaQuote(code)
  if (sina) return { quote: sina, quoteSource: 'sina' }

  const em = await fetchEastmoneyQuote(code)
  if (em) return { quote: em, quoteSource: 'eastmoney' }

  const fromBars = quoteFromBars(code, fallbackName, bars)
  if (fromBars) return { quote: fromBars, quoteSource: 'kline' }

  throw new Error('行情暂不可用，请稍后重试')
}

async function loadMarketSnapshot(
  code: string,
  period: KlinePeriodId,
  limit: number,
  hintName?: string
): Promise<MarketSnapshot> {
  const [klineResult, quoteEarly] = await Promise.all([
    fetchKlineWithFallback(code, period, limit),
    (async () => {
      const sina = await fetchSinaQuote(code)
      if (sina) return { quote: sina, quoteSource: 'sina' as const }
      const em = await fetchEastmoneyQuote(code)
      if (em) return { quote: em, quoteSource: 'eastmoney' as const }
      return null
    })()
  ])

  const { kline, klineSource } = klineResult
  const displayName = hintName?.trim() || kline.name || code
  const { quote, quoteSource } = quoteEarly ?? (await resolveQuote(code, displayName, kline.bars))

  return {
    quote: { ...quote, name: quote.name || displayName },
    kline: { ...kline, name: kline.name === code ? quote.name || displayName : kline.name },
    meta: { quoteSource, klineSource }
  }
}

export async function fetchMarketSnapshot(
  code: string,
  period: KlinePeriodId,
  limit: number,
  hintName?: string
): Promise<MarketSnapshot> {
  if (!isAshareCode(code)) {
    throw new Error('无效股票代码')
  }

  const periodCfg = getPeriodConfig(period)
  const safeLimit = Number.isFinite(limit) ? limit : periodCfg.limit
  const cacheKey = snapshotCacheKey(code, period)

  if (isSnapshotFresh(cacheKey)) {
    const hit = getCachedSnapshot(cacheKey)
    if (hit) return hit
  }

  const pending = getInflightSnapshot(cacheKey)
  if (pending) return pending

  const task = (async () => {
    try {
      const snapshot = await loadMarketSnapshot(code, period, safeLimit, hintName)
      setCachedSnapshot(cacheKey, snapshot)
      return snapshot
    } catch (e) {
      const stale = getCachedSnapshot(cacheKey)
      if (stale) {
        return {
          ...stale,
          meta: { ...stale.meta, stale: true }
        }
      }
      throw e
    }
  })()

  setInflightSnapshot(cacheKey, task)
  return task
}

export async function fetchKlineBars(
  code: string,
  period: KlinePeriodId,
  limit: number
): Promise<KlineResponse> {
  const { kline } = await fetchKlineWithFallback(code, period, limit)
  return kline
}

export async function fetchQuoteOnly(code: string): Promise<QuoteSnapshot> {
  if (!isAshareCode(code)) {
    throw new Error('无效股票代码')
  }

  const sina = await fetchSinaQuote(code)
  if (sina) return sina

  const em = await fetchEastmoneyQuote(code)
  if (em) return em

  throw new Error('行情暂不可用，请稍后重试')
}
