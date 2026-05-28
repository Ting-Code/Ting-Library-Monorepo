import type {
  HeatmapPeriodKey,
  MarketKey,
  QuotesResponse,
  TreemapResponse
} from './server/market-heatmap'

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json() as Promise<T>
}

export async function fetchTreemap(market: MarketKey, period: HeatmapPeriodKey) {
  const params = new URLSearchParams({ market, period })
  const response = await fetch(`/heatmap/api/treemap?${params.toString()}`, {
    cache: 'no-store'
  })
  return parseJson<TreemapResponse>(response)
}

export async function fetchQuotes(market: MarketKey, period: HeatmapPeriodKey) {
  const params = new URLSearchParams({ market, period, metric: '1' })
  const response = await fetch(`/heatmap/api/quotes?${params.toString()}`, {
    cache: 'no-store'
  })
  return parseJson<QuotesResponse>(response)
}
