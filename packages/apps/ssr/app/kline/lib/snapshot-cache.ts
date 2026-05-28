import type { MarketSnapshot } from './fetch-market'
import type { KlinePeriodId } from './periods'

type SnapshotEntry = {
  snapshot: MarketSnapshot
  freshUntil: number
  staleUntil: number
}

const FRESH_MS = 12_000
const STALE_MS = 90_000

const store = new Map<string, SnapshotEntry>()
const inflight = new Map<string, Promise<MarketSnapshot>>()

export function snapshotCacheKey(code: string, period: KlinePeriodId) {
  return `${code}:${period}`
}

export function getCachedSnapshot(key: string): MarketSnapshot | undefined {
  const entry = store.get(key)
  if (!entry) return undefined
  if (Date.now() > entry.staleUntil) {
    store.delete(key)
    return undefined
  }
  return entry.snapshot
}

export function isSnapshotFresh(key: string): boolean {
  const entry = store.get(key)
  return Boolean(entry && Date.now() <= entry.freshUntil)
}

export function setCachedSnapshot(key: string, snapshot: MarketSnapshot) {
  const now = Date.now()
  store.set(key, {
    snapshot,
    freshUntil: now + FRESH_MS,
    staleUntil: now + STALE_MS
  })
}

export function getInflightSnapshot(key: string) {
  return inflight.get(key)
}

export function setInflightSnapshot(key: string, promise: Promise<MarketSnapshot>) {
  inflight.set(key, promise)
  void promise.finally(() => {
    if (inflight.get(key) === promise) {
      inflight.delete(key)
    }
  })
}
