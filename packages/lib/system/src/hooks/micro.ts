import { getURL } from './url'
import { getGlobalDataAuth, getGlobalDataEnv } from '../global-data'
import { error } from '@tingcode/utils'

// 'development' | 'production'
export const devMicroUrlMap = {
  docs: 'http://localhost:8680/',
  micro: 'http://localhost:8080/'
}
const IFRAME = ['docs']

export const useMicro = (module?: keyof typeof devMicroUrlMap) => {
  const { pathname } = getURL()
  const auth = getGlobalDataAuth()
  const ENV = getGlobalDataEnv()
  if (module && ENV?.env) {
    return {
      name: module,
      path: pathname,
      url: getMicroUrl(module, ENV.env),
      isIframe: IFRAME.includes(module)
    }
  }
  const route = auth?.find((route) => route.path === pathname)
  if (route && route?.meta?.module && ENV?.env) {
    return {
      name: route.meta.module,
      path: pathname,
      url: getMicroUrl(route.meta.module, ENV.env),
      isIframe: IFRAME.includes(route.meta.module)
    }
  }
  return error(`${ENV?.env} not found ${route?.meta?.module} model`)
}

export function getMicroUrl(module: string, env: 'development' | 'production' | 'test') {
  if (env === 'production') return `http://139.199.173.241/${module}/`
  return devMicroUrlMap[module]
}
