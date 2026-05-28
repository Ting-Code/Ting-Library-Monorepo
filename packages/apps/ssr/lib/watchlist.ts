export type WatchlistItem = {
  code: string
  name: string
  addedAt: number
}

const STORAGE_KEY = 'ssr-h5-watchlist'

function readRaw(): WatchlistItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as WatchlistItem[]
    return Array.isArray(parsed) ? parsed.filter((x) => x?.code && x?.name) : []
  } catch {
    return []
  }
}

export function getWatchlist(): WatchlistItem[] {
  return readRaw().sort((a, b) => b.addedAt - a.addedAt)
}

export function isInWatchlist(code: string): boolean {
  return readRaw().some((item) => item.code === code)
}

export function addToWatchlist(item: Omit<WatchlistItem, 'addedAt'>): WatchlistItem[] {
  const list = readRaw().filter((x) => x.code !== item.code)
  const next = [{ ...item, addedAt: Date.now() }, ...list]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent('watchlist-changed'))
  return next
}

export function removeFromWatchlist(code: string): WatchlistItem[] {
  const next = readRaw().filter((x) => x.code !== code)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent('watchlist-changed'))
  return next
}

export function toggleWatchlist(item: Omit<WatchlistItem, 'addedAt'>): boolean {
  if (isInWatchlist(item.code)) {
    removeFromWatchlist(item.code)
    return false
  }
  addToWatchlist(item)
  return true
}
