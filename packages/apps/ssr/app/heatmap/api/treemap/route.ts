import { getTreemapData, isHeatmapPeriodKey, isMarketKey } from '../../lib/server/market-heatmap'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const market = searchParams.get('market') ?? 'all'
  const period = searchParams.get('period') ?? 'day'

  if (!isMarketKey(market) || !isHeatmapPeriodKey(period)) {
    return Response.json({ error: 'Invalid market or period' }, { status: 400 })
  }

  try {
    const data = await getTreemapData(market, period)
    return Response.json(data)
  } catch (error) {
    console.error('[heatmap/api/treemap]', error)
    return Response.json({ error: 'Failed to load treemap data' }, { status: 500 })
  }
}
