import { getURL } from './router'
import { getGlobalDataAuth, getGlobalDataEnv } from '../global-data'
import { error } from '@tingcode/utils'

// 'development' | 'production'
export const devMicroUrlMap = {
  docs: 'http://localhost:8680/docs/',
  micro: 'http://localhost:8080/'
}
const IFRAME = ['docs']

export const useMicro = (module?: keyof typeof devMicroUrlMap) => {
  const url = getURL()
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
  const route = auth?.find((route) => route.path === url?.pathname)
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
  if (env === 'production') return `http://139.199.173.241/${module}/`
  return devMicroUrlMap[module]
}