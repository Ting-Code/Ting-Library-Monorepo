import type { HeatmapPeriodKey, MarketKey } from './server/market-heatmap'

export const REFRESH_INTERVAL_MS = 8_000

export const MARKET_OPTIONS: MarketKey[] = ['all', 'sse', 'szse', 'hs300', 'zza500', 'cyb', 'kcb']

export const PERIOD_OPTIONS: HeatmapPeriodKey[] = ['day', 'week', 'month', 'year']

export const MARKET_LABELS: Record<MarketKey, string> = {
  all: '全部A股',
  sse: '上证',
  szse: '深证',
  hs300: '沪深300',
  zza500: 'A500',
  cyb: '创业板',
  kcb: '科创板'
}

export const PERIOD_LABELS: Record<HeatmapPeriodKey, string> = {
  day: '日',
  week: '周',
  month: '月',
  year: '年'
}
