import type { Bar } from './types'
import type { QuoteSnapshot } from './types'

/** K 线最后一根推导简易行情（东财/新浪均失败时的兜底） */
export function quoteFromBars(code: string, name: string, bars: Bar[]): QuoteSnapshot | null {
  if (bars.length === 0) return null

  const last = bars[bars.length - 1]
  const prev = bars.length > 1 ? bars[bars.length - 2] : null
  const prevClose = prev?.close ?? last.open
  const change = last.close - prevClose
  const changePct = prevClose > 0 ? (change / prevClose) * 100 : 0

  return {
    code,
    name,
    price: last.close,
    change,
    changePct,
    open: last.open,
    high: last.high,
    low: last.low,
    volume: last.volume,
    amount: 0,
    updatedAt: new Date().toISOString()
  }
}
