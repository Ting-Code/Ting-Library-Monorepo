import type { Bar } from './types'

type EastMoneyKlinePayload = {
  code?: string
  name?: string
  klines?: string[]
}

/** 东财单行：日期,开,收,高,低,量,额,... */
export function parseEastMoneyKlineRow(row: string): Bar | null {
  const parts = row.split(',')
  if (parts.length < 6) return null

  const [date, openStr, closeStr, highStr, lowStr, volumeStr] = parts
  const open = Number(openStr)
  const close = Number(closeStr)
  const high = Number(highStr)
  const low = Number(lowStr)
  const volume = Number(volumeStr)

  if (
    !date ||
    !Number.isFinite(open) ||
    !Number.isFinite(close) ||
    !Number.isFinite(high) ||
    !Number.isFinite(low) ||
    high < low
  ) {
    return null
  }

  const time = Math.floor(new Date(`${date}T00:00:00+08:00`).getTime() / 1000)
  if (!Number.isFinite(time)) return null

  return {
    time,
    open,
    high,
    low,
    close,
    volume: Number.isFinite(volume) ? volume : 0
  }
}

export function normalizeEastMoneyKlines(
  data: EastMoneyKlinePayload,
  symbol: string
): { name: string; bars: Bar[] } {
  const bars: Bar[] = []
  const seen = new Set<number>()

  for (const row of data.klines ?? []) {
    const bar = parseEastMoneyKlineRow(row)
    if (!bar || seen.has(bar.time)) continue
    seen.add(bar.time)
    bars.push(bar)
  }

  bars.sort((a, b) => a.time - b.time)

  return {
    name: data.name?.trim() || symbol,
    bars
  }
}
