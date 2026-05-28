import { NextResponse } from 'next/server'

import { fetchQuoteOnly } from '../../lib/fetch-market'
import { isAshareCode } from '../../lib/secid'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get('code')?.trim() ?? ''

  if (!isAshareCode(code)) {
    return NextResponse.json({ error: '无效股票代码' }, { status: 400 })
  }

  try {
    const body = await fetchQuoteOnly(code)
    return NextResponse.json(body)
  } catch (e) {
    const message = e instanceof Error ? e.message : '行情暂不可用'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
