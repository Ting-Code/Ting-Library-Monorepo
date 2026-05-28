import { NextResponse } from 'next/server'

import { fetchMarketSnapshot } from '../../lib/fetch-market'
import { getPeriodConfig } from '../../lib/periods'
import type { KlinePeriodId } from '../../lib/periods'
import { isAshareCode } from '../../lib/secid'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')?.trim() ?? ''
  const name = searchParams.get('name')?.trim()
  const periodParam = (searchParams.get('period') ?? '1d') as KlinePeriodId
  const period: KlinePeriodId = ['1d', '1w', '1M'].includes(periodParam) ? periodParam : '1d'
  const periodCfg = getPeriodConfig(period)
  const limitRaw = Number(searchParams.get('limit') ?? periodCfg.limit)
  const limit = Number.isFinite(limitRaw) ? limitRaw : periodCfg.limit

  if (!isAshareCode(code)) {
    return NextResponse.json({ error: '无效股票代码' }, { status: 400 })
  }

  try {
    const snapshot = await fetchMarketSnapshot(code, period, limit, name)
    return NextResponse.json(snapshot)
  } catch (e) {
    const message = e instanceof Error ? e.message : '数据加载失败'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
