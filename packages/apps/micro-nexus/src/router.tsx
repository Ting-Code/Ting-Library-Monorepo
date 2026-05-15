import { createBrowserRouter } from 'react-router-dom'

import { HeatmapPage } from '@/routes/heatmap-page'

/**
 * `import.meta.env.BASE_URL`（dev `/nexus/`，prod `/micro/nexus/`）
 * 与嵌入后 iframe 实际 `location.pathname` / `__MICRO_APP_BASE_ROUTE__` 可能不一致，
 * 不匹配时 React Router 会认为无命中路由，表现成只挂了根节点、主内容空白。
 */
function normalizePathBase(value: string) {
  let s = value.replace(/\/{2,}/g, '/').trim()
  if (s === '/' || s === '') {
    return '/'
  }
  if (!s.startsWith('/')) {
    s = `/${s}`
  }
  return s.replace(/\/+$/, '')
}

export function resolveRouterBasename() {
  const fromVite = normalizePathBase(import.meta.env.BASE_URL ?? '/')

  if (typeof window === 'undefined') {
    return fromVite
  }

  const pathname = window.location.pathname || '/'
  const pathnameMatches = (base: string) =>
    base !== '/' && (pathname === base || pathname.startsWith(`${base}/`))

  if (pathnameMatches(fromVite)) {
    return fromVite
  }

  const raw = window.__MICRO_APP_BASE_ROUTE__
  if (raw !== undefined && String(raw).trim() !== '') {
    const fromMicro = normalizePathBase(String(raw))
    if (pathnameMatches(fromMicro)) {
      return fromMicro
    }
  }

  return fromVite
}

const basename = resolveRouterBasename()

export const router = createBrowserRouter(
  [
    { path: '/', element: <HeatmapPage /> },
    { path: '*', element: <HeatmapPage /> }
  ],
  { basename }
)
