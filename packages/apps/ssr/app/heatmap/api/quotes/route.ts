import {
  getQuoteData,
  isHeatmapPeriodKey,
  isMarketKey,
  isMetricKey
} from '../../lib/server/market-heatmap'
import type { MetricKey } from '../../lib/server/market-heatmap'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const market = searchParams.get('market') ?? 'all'
  const period = searchParams.get('period') ?? 'day'
  const metric = searchParams.get('metric')

  if (!isMarketKey(market) || !isHeatmapPeriodKey(period)) {
    return Response.json({ error: 'Invalid market or period' }, { status: 400 })
  }

  let metricKey: MetricKey | undefined
  if (metric) {
    if (!isMetricKey(metric)) {
      return Response.json({ error: 'Invalid metric' }, { status: 400 })
    }
    metricKey = metric
  }

  try {
    const data = await getQuoteData(market, period, metricKey)
    return Response.json(data)
  } catch (error) {
    console.error('[heatmap/api/quotes]', error)
    return Response.json({ error: 'Failed to load quotes' }, { status: 500 })
  }
}
