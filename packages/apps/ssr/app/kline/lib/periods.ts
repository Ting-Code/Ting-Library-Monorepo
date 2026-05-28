import { EASTMONEY_KLT_DAILY, EASTMONEY_KLT_MONTHLY, EASTMONEY_KLT_WEEKLY } from './constants'

export type KlinePeriodId = '1d' | '1w' | '1M'

export const KLINE_PERIODS: {
  id: KlinePeriodId
  label: string
  klt: string
  limit: number
}[] = [
  { id: '1d', label: '日K', klt: EASTMONEY_KLT_DAILY, limit: 120 },
  { id: '1w', label: '周K', klt: EASTMONEY_KLT_WEEKLY, limit: 120 },
  { id: '1M', label: '月K', klt: EASTMONEY_KLT_MONTHLY, limit: 120 }
]

export function getPeriodConfig(id: KlinePeriodId) {
  return KLINE_PERIODS.find((p) => p.id === id) ?? KLINE_PERIODS[0]
}

export function periodAdjustLabel(id: KlinePeriodId): string {
  const map: Record<KlinePeriodId, string> = {
    '1d': '日K',
    '1w': '周K',
    '1M': '月K'
  }
  return `${map[id]} · 前复权`
}
