import type { QuoteSnapshot } from '@/app/kline/lib/types'

import { TtlCache } from './ttl-cache'

const SINA_URL = 'https://hq.sinajs.cn/list='
const SINA_HEADERS: HeadersInit = {
  Referer: 'https://finance.sina.com.cn/',
  'User-Agent': 'Mozilla/5.0 (compatible; TingSSR/1.0)',
  Accept: '*/*'
}

const quoteCache = new TtlCache<QuoteSnapshot>(8_000)

/** 6 位 A 股代码 → 新浪 list 符号 */
export function toSinaListSymbol(code: string): string {
  if (code.startsWith('6')) return `sh${code}`
  if (code.startsWith('8') || code.startsWith('4')) return `bj${code}`
  return `sz${code}`
}

function decodeSinaBody(buffer: ArrayBuffer): string {
  try {
    return new TextDecoder('gb18030').decode(buffer)
  } catch {
    return new TextDecoder('utf-8').decode(buffer)
  }
}

/**
 * 新浪 hq_str 字段：0 名称, 1 今开, 2 昨收, 3 现价, 4 最高, 5 最低, 8 成交量, 9 成交额
 */
export function parseSinaHqLine(code: string, rawLine: string): QuoteSnapshot | null {
  const match = /="([^"]*)"/.exec(rawLine)
  if (!match?.[1]) return null

  const fields = match[1].split(',')
  if (fields.length < 10) return null

  const name = fields[0]?.trim()
  const open = Number(fields[1])
  const prevClose = Number(fields[2])
  const price = Number(fields[3])
  const high = Number(fields[4])
  const low = Number(fields[5])
  const volume = Number(fields[8])
  const amount = Number(fields[9])

  if (!Number.isFinite(price) || price <= 0) return null

  const change = Number.isFinite(prevClose) && prevClose > 0 ? price - prevClose : 0
  const changePct = Number.isFinite(prevClose) && prevClose > 0 ? (change / prevClose) * 100 : 0

  return {
    code,
    name: name || code,
    price,
    change,
    changePct,
    open: Number.isFinite(open) ? open : 0,
    high: Number.isFinite(high) ? high : 0,
    low: Number.isFinite(low) ? low : 0,
    volume: Number.isFinite(volume) ? volume : 0,
    amount: Number.isFinite(amount) ? amount : 0,
    updatedAt: new Date().toISOString()
  }
}

export async function fetchSinaQuote(code: string): Promise<QuoteSnapshot | null> {
  const cached = quoteCache.get(code)
  if (cached) return cached

  const symbol = toSinaListSymbol(code)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 10_000)

  try {
    const res = await fetch(`${SINA_URL}${symbol}`, {
      headers: SINA_HEADERS,
      cache: 'no-store',
      signal: controller.signal
    })
    if (!res.ok) return null

    const text = decodeSinaBody(await res.arrayBuffer())
    const quote = parseSinaHqLine(code, text)
    if (quote) quoteCache.set(code, quote)
    return quote
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}
