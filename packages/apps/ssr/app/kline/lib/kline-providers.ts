import { fetchEastmoneyKlineJson } from '@/lib/eastmoney-fetch'
import { toSinaListSymbol } from '@/lib/sina-quote'

import { EASTMONEY_FQT_QFQ, MAX_BAR_LIMIT, MIN_BAR_LIMIT } from './constants'
import { normalizeEastMoneyKlines } from './normalize-eastmoney'
import { getPeriodConfig } from './periods'
import type { KlinePeriodId } from './periods'
import { isAshareCode, toSecId } from './secid'
import type { Bar, KlineResponse } from './types'

const SINA_KLINE_URL =
  'https://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData'
const TENCENT_KLINE_URL = 'https://web.ifzq.gtimg.cn/appstock/app/fqkline/get'

const SINA_HEADERS: HeadersInit = {
  Referer: 'https://finance.sina.com.cn/',
  'User-Agent': 'Mozilla/5.0 (compatible; TingSSR/1.0)',
  Accept: 'application/json, text/plain, */*'
}

const TENCENT_HEADERS: HeadersInit = {
  Referer: 'https://gu.qq.com/',
  'User-Agent': 'Mozilla/5.0 (compatible; TingSSR/1.0)',
  Accept: 'application/json, text/plain, */*'
}

const SINA_SCALE: Record<KlinePeriodId, number> = {
  '1d': 240,
  '1w': 1200,
  '1M': 7200
}

const TENCENT_PERIOD: Record<KlinePeriodId, string> = {
  '1d': 'day',
  '1w': 'week',
  '1M': 'month'
}

const TENCENT_DAY_KEY: Record<KlinePeriodId, 'qfqday' | 'qfqweek' | 'qfqmonth'> = {
  '1d': 'qfqday',
  '1w': 'qfqweek',
  '1M': 'qfqmonth'
}

type EastMoneyKlineJson = {
  rc?: number
  data?: {
    code?: string
    name?: string
    klines?: string[]
  }
}

type SinaKlineRow = {
  day?: string
  open?: string
  high?: string
  low?: string
  close?: string
  volume?: string
}

function parseDateToUnix(dateStr: string): number {
  const normalized = dateStr.includes(' ') ? dateStr : `${dateStr}T00:00:00+08:00`
  const ms = new Date(normalized).getTime()
  return Number.isFinite(ms) ? Math.floor(ms / 1000) : 0
}

function rowsToBars(rows: Bar[]): Bar[] {
  return rows
    .filter((r) => r.time > 0 && r.high >= r.low && r.close > 0)
    .sort((a, b) => a.time - b.time)
}

async function fetchEastmoneyKline(
  code: string,
  period: KlinePeriodId,
  limit: number
): Promise<KlineResponse | null> {
  const periodCfg = getPeriodConfig(period)
  const qs = new URLSearchParams({
    secid: toSecId(code),
    ut: 'fa5fd1943c7b386f172d9cf711bae',
    fields1: 'f1,f2,f3,f4,f5,f6',
    fields2: 'f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61',
    klt: periodCfg.klt,
    fqt: EASTMONEY_FQT_QFQ,
    beg: '0',
    end: '20500101',
    lmt: String(limit)
  })

  try {
    const json = await fetchEastmoneyKlineJson<EastMoneyKlineJson>(qs, (data) => {
      return data.rc === 0 && Boolean(data.data?.klines?.length)
    })
    if (json.rc !== 0 || !json.data?.klines?.length) return null

    const { name, bars } = normalizeEastMoneyKlines(json.data, code)
    if (bars.length === 0) return null

    return {
      symbol: code,
      name,
      period: periodCfg.id,
      adjust: 'qfq',
      bars,
      updatedAt: new Date().toISOString()
    }
  } catch {
    return null
  }
}

async function fetchTencentKline(
  code: string,
  period: KlinePeriodId,
  limit: number
): Promise<KlineResponse | null> {
  const symbol = toSinaListSymbol(code)
  const txPeriod = TENCENT_PERIOD[period]
  const param = `${symbol},${txPeriod},,,${limit},qfq`
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 10_000)

  try {
    const res = await fetch(`${TENCENT_KLINE_URL}?param=${encodeURIComponent(param)}`, {
      headers: TENCENT_HEADERS,
      cache: 'no-store',
      signal: controller.signal
    })
    if (!res.ok) return null

    const json = (await res.json()) as {
      code?: number
      data?: Record<string, Record<string, string[][]>>
    }
    const dayKey = TENCENT_DAY_KEY[period]
    const rows = json.data?.[symbol]?.[dayKey]
    if (!Array.isArray(rows) || rows.length === 0) return null

    const bars: Bar[] = rowsToBars(
      rows.map((row) => {
        const [date, open, close, high, low, volume] = row
        return {
          time: parseDateToUnix(date),
          open: Number(open),
          close: Number(close),
          high: Number(high),
          low: Number(low),
          volume: Number(volume) || 0
        }
      })
    )

    if (bars.length === 0) return null

    return {
      symbol: code,
      name: code,
      period,
      adjust: 'qfq',
      bars,
      updatedAt: new Date().toISOString()
    }
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

async function fetchSinaKline(
  code: string,
  period: KlinePeriodId,
  limit: number
): Promise<KlineResponse | null> {
  const symbol = toSinaListSymbol(code)
  const scale = SINA_SCALE[period]
  const qs = new URLSearchParams({
    symbol,
    scale: String(scale),
    ma: 'no',
    datalen: String(limit)
  })
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 10_000)

  try {
    const res = await fetch(`${SINA_KLINE_URL}?${qs}`, {
      headers: SINA_HEADERS,
      cache: 'no-store',
      signal: controller.signal
    })
    if (!res.ok) return null

    const rows = (await res.json()) as SinaKlineRow[]
    if (!Array.isArray(rows) || rows.length === 0) return null

    const bars: Bar[] = rowsToBars(
      rows.map((row) => ({
        time: parseDateToUnix(row.day ?? ''),
        open: Number(row.open),
        high: Number(row.high),
        low: Number(row.low),
        close: Number(row.close),
        volume: Number(row.volume) || 0
      }))
    )

    if (bars.length === 0) return null

    return {
      symbol: code,
      name: code,
      period,
      adjust: 'qfq',
      bars,
      updatedAt: new Date().toISOString()
    }
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

export type KlineSource = 'eastmoney' | 'tencent' | 'sina'

export async function fetchKlineWithFallback(
  code: string,
  period: KlinePeriodId,
  limit: number
): Promise<{ kline: KlineResponse; klineSource: KlineSource }> {
  if (!isAshareCode(code)) {
    throw new Error('无效股票代码')
  }

  const periodCfg = getPeriodConfig(period)
  const safeLimit = Math.min(
    MAX_BAR_LIMIT,
    Math.max(MIN_BAR_LIMIT, Number.isFinite(limit) ? limit : periodCfg.limit)
  )

  const em = await fetchEastmoneyKline(code, period, safeLimit)
  if (em) return { kline: em, klineSource: 'eastmoney' }

  const tx = await fetchTencentKline(code, period, safeLimit)
  if (tx) return { kline: tx, klineSource: 'tencent' }

  const sina = await fetchSinaKline(code, period, safeLimit)
  if (sina) return { kline: sina, klineSource: 'sina' }

  throw new Error('K 线暂不可用，请稍后重试')
}
