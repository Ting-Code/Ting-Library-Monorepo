import { NextResponse } from 'next/server'

import { fetchKlineBars } from '../../lib/fetch-market'
import { getPeriodConfig } from '../../lib/periods'
import type { KlinePeriodId } from '../../lib/periods'
import { isAshareCode } from '../../lib/secid'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')?.trim() ?? ''
  const periodParam = (searchParams.get('period') ?? '1d') as KlinePeriodId
  const period: KlinePeriodId = ['1d', '1w', '1M'].includes(periodParam) ? periodParam : '1d'
  const periodCfg = getPeriodConfig(period)
  const limitRaw = Number(searchParams.get('limit') ?? periodCfg.limit)
  const limit = Number.isFinite(limitRaw) ? limitRaw : periodCfg.limit

  if (!isAshareCode(code)) {
    return NextResponse.json({ error: '无效股票代码' }, { status: 400 })
  }

  try {
    const body = await fetchKlineBars(code, period, limit)
    return NextResponse.json(body)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'K 线暂不可用'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
