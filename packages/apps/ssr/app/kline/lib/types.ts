export type Bar = {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

import type { KlinePeriodId } from './periods'

export type KlineResponse = {
  symbol: string
  name: string
  period: KlinePeriodId
  adjust: 'qfq' | 'none'
  bars: Bar[]
  updatedAt: string
}

export type QuoteSnapshot = {
  code: string
  name: string
  price: number
  change: number
  changePct: number
  open: number
  high: number
  low: number
  volume: number
  amount: number
  updatedAt: string
}
