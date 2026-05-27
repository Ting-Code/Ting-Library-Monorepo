import { getUrl } from './router'
import { getGlobalDataAuth, getGlobalDataEnv } from '../global-data'
import { error } from '@tingcode/utils'

// 'development' | 'production'
export const devMicroUrlMap = {
  docs: 'http://localhost:8682/docs/',
  i18n: 'http://localhost:8685/i18n/',
  demo: 'http://localhost:8680/',
  modeling: 'http://localhost:8683/modeling/',
  nexus: 'http://localhost:8686/nexus/'
}
export const proMicroUrlMap = {
  docs: 'http://159.75.104.173/micro/docs/',
  i18n: 'http://159.75.104.173/micro/i18n/',
  demo: 'http://159.75.104.173/micro/demo/',
  modeling: 'http://159.75.104.173/micro/modeling/',
  nexus: 'http://159.75.104.173/micro/nexus/'
}
export const MICRO_MODULE_KEYS = Object.keys(devMicroUrlMap)

const IFRAME = ['docs', 'i18n', 'modeling', 'nexus']

const normPath = (p?: string) => (p && p !== '/' ? p.replace(/\/+$/, '') : p || '/')

export function isMicroModuleKey(moduleKey: string): boolean {
  return Object.prototype.hasOwnProperty.call(devMicroUrlMap, moduleKey)
}

/** 按 URL 前缀解析微应用模块，如 /docs/visual/flow → docs */
export function resolveMicroModuleByPath(pathname?: string): string | undefined {
  const current = normPath(pathname)
  return MICRO_MODULE_KEYS.find((module) => {
    const base = `/${module}`
    return current === base || current.startsWith(`${base}/`)
  })
}

/** 菜单 path 精确/前缀匹配；未登记子路由时按 /{module}/ 前缀回落到对应微应用 */
export function findAuthRouteByPath(
  pathname: string | undefined,
  auth?: { path?: string; meta?: { module?: string } }[]
) {
  if (!pathname) return undefined
  const current = normPath(pathname)
  if (auth?.length) {
    const exact = auth.find((r) => normPath(r.path) === current)
    if (exact) return exact
    const byMenuPrefix = auth
      .filter((r) => {
        const base = normPath(r.path)
        return r.meta?.module && base !== '/' && current.startsWith(`${base}/`)
      })
      .sort((a, b) => normPath(b.path).length - normPath(a.path).length)[0]
    if (byMenuPrefix) return byMenuPrefix
  }
  const module = resolveMicroModuleByPath(pathname)
  if (module) {
    return { path: current, meta: { module } }
  }
  return undefined
}

export const useMicro = (module?: keyof typeof devMicroUrlMap) => {
  const url = getUrl()
  const auth = getGlobalDataAuth()
  const ENV = getGlobalDataEnv()
  if (module) {
    return {
      name: module,
      path: url?.pathname,
      url: getMicroUrl(module, ENV?.env),
      isIframe: IFRAME.includes(module)
    }
  }
  const route = findAuthRouteByPath(url?.pathname, auth)
  if (route && route?.meta?.module && ENV?.env) {
    return {
      name: route.meta.module,
      path: url?.pathname,
      url: getMicroUrl(route.meta.module, ENV.env),
      isIframe: IFRAME.includes(route.meta.module)
    }
  }
  return error(`useMicro ${ENV?.env} not found ${route?.meta?.module} model`)
}

export function getMicroUrl(module: string, env: 'development' | 'production' | 'test' | unknown) {
  if (env === 'production') return proMicroUrlMap[module]
  return devMicroUrlMap[module]
}
