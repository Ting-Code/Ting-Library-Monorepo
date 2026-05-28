import { NextResponse } from 'next/server'

import dividendData from '../data/dividend-2025.json'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const ULIST = 'https://push2.eastmoney.com/api/qt/ulist.np/get'
const BATCH = 200
const CONCURRENCY = 8

type DividendItem = [string, string, number]

/** 东方财富 secid：沪 1.xxx，深/北 0.xxx */
function toSecId(code: string): string {
  return `${code.startsWith('6') ? '1' : '0'}.${code}`
}

async function fetchBatch(
  secids: string[]
): Promise<{ f12?: string; f14?: string; f2?: number }[]> {
  const qs = new URLSearchParams({
    fltt: '2',
    fields: 'f12,f14,f2',
    ut: 'bd1d9ddb04089700cf9c27f6f7426281',
    secids: secids.join(',')
  })
  const res = await fetch(`${ULIST}?${qs}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Referer: 'https://quote.eastmoney.com/'
    },
    next: { revalidate: 0 }
  })
  if (!res.ok) throw new Error(`ulist HTTP ${res.status}`)
  const json = (await res.json()) as {
    rc?: number
    data?: { diff?: { f12?: string; f14?: string; f2?: number }[] }
  }
  if (json.rc !== 0) throw new Error(`ulist rc=${json.rc}`)
  return json.data?.diff ?? []
}

async function fetchBatchWithRetry(secids: string[]) {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      return await fetchBatch(secids)
    } catch {
      await new Promise((r) => setTimeout(r, 400 * (attempt + 1)))
    }
  }
  return []
}

async function mapPool<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let next = 0
  async function run() {
    while (next < items.length) {
      const i = next++
      results[i] = await worker(items[i], i)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => run()))
  return results
}

export async function GET() {
  const items = (dividendData as unknown as { items: DividendItem[] }).items
  const codes = items.map(([code]) => code)
  const prices: Record<string, { price: number; name: string }> = {}

  const chunks: string[][] = []
  for (let i = 0; i < codes.length; i += BATCH) {
    chunks.push(codes.slice(i, i + BATCH))
  }

  try {
    const batches = await mapPool(chunks, CONCURRENCY, async (chunk) => {
      const secids = chunk.map(toSecId)
      return fetchBatchWithRetry(secids)
    })

    for (const diff of batches) {
      for (const row of diff) {
        const code = row.f12
        const price = Number(row.f2)
        if (code && price > 0) {
          prices[code] = { price, name: row.f14 ?? '' }
        }
      }
    }

    return NextResponse.json({
      source: 'eastmoney-ulist.np',
      field: 'f2',
      priceType: 'latest',
      note: 'f2 最新价：盘中为现价，休市为最近收盘价；一次批量拉取后由前端排序分页',
      updatedAt: new Date().toISOString(),
      dividendCount: codes.length,
      count: Object.keys(prices).length,
      prices
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'fetch failed'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
