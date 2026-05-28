import { TtlCache } from './ttl-cache'

const REQUEST_TIMEOUT_MS = 10_000
/** 减少重试，避免触发东财限流 */
const RETRIES_PER_HOST = 1

const EASTMONEY_HEADERS: HeadersInit = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Referer: 'https://quote.eastmoney.com/',
  Accept: 'application/json, text/plain, */*'
}

const ULIST_HOSTS = ['https://push2delay.eastmoney.com', 'https://push2.eastmoney.com'] as const

const KLINE_HOSTS = ['https://push2his.eastmoney.com'] as const

const ULIST_PATH = '/api/qt/ulist.np/get'
const KLINE_PATH = '/api/qt/stock/kline/get'

const jsonCache = new TtlCache<unknown>(10_000)

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function formatFetchError(e: unknown, host: string): Error {
  if (e instanceof Error) {
    const cause = (e as Error & { cause?: { code?: string } }).cause
    const code = cause?.code ? ` (${cause.code})` : ''
    if (e.name === 'AbortError') {
      return new Error(`东财请求超时: ${host}`)
    }
    if (e.message === 'fetch failed') {
      return new Error(`东财网络异常${code}`)
    }
    return new Error(`${e.message}${code}`)
  }
  return new Error(`东财请求失败: ${host}`)
}

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: { ...EASTMONEY_HEADERS, ...init?.headers },
      cache: 'no-store',
      next: { revalidate: 0 }
    })
  } finally {
    clearTimeout(timer)
  }
}

async function fetchWithHostFallback(
  hosts: readonly string[],
  path: string,
  searchParams: URLSearchParams
): Promise<Response> {
  let lastError: Error | undefined

  for (const host of hosts) {
    const url = `${host}${path}?${searchParams.toString()}`
    for (let attempt = 0; attempt <= RETRIES_PER_HOST; attempt++) {
      try {
        const res = await fetchWithTimeout(url)
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        return res
      } catch (e) {
        lastError = formatFetchError(e, host)
        if (attempt < RETRIES_PER_HOST) {
          await sleep(300)
        }
      }
    }
  }

  throw lastError ?? new Error('东财接口不可用')
}

export async function fetchEastmoneyJson<T>(
  hosts: readonly string[],
  path: string,
  searchParams: URLSearchParams,
  isValid?: (json: T) => boolean
): Promise<T> {
  const urlKey = `${path}?${searchParams.toString()}`
  const cached = jsonCache.get(urlKey)
  if (cached !== undefined) {
    return cached as T
  }

  const res = await fetchWithHostFallback(hosts, path, searchParams)
  const json = (await res.json()) as T

  if (!isValid || isValid(json)) {
    jsonCache.set(urlKey, json)
  }

  return json
}

export async function fetchEastmoneyUlist(searchParams: URLSearchParams): Promise<Response> {
  return fetchWithHostFallback(ULIST_HOSTS, ULIST_PATH, searchParams)
}

export async function fetchEastmoneyKline(searchParams: URLSearchParams): Promise<Response> {
  return fetchWithHostFallback(KLINE_HOSTS, KLINE_PATH, searchParams)
}

export async function fetchEastmoneyUlistJson<T>(
  searchParams: URLSearchParams,
  isValid?: (json: T) => boolean
): Promise<T> {
  return fetchEastmoneyJson<T>(ULIST_HOSTS, ULIST_PATH, searchParams, isValid)
}

export async function fetchEastmoneyKlineJson<T>(
  searchParams: URLSearchParams,
  isValid?: (json: T) => boolean
): Promise<T> {
  return fetchEastmoneyJson<T>(KLINE_HOSTS, KLINE_PATH, searchParams, isValid)
}
