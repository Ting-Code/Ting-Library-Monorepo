/** [code, name, dividendPerShare] */
export type DividendItem = [string, string, number]

export type Dividend2025Data = {
  reportDate: string
  updatedAt: string
  items: DividendItem[]
}

export type RankRow = {
  code: string
  name: string
  price: number
  dps: number
  yieldPct: number
}

export type SpotResponse = {
  updatedAt: string
  count: number
  dividendCount?: number
  source?: string
  field?: string
  priceType?: string
  note?: string
  prices: Record<string, { price: number; name: string }>
}
