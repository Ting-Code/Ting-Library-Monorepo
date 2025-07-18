import { getUrl } from './router'
import { getGlobalDataAuth, getGlobalDataEnv } from '../global-data'
import { error } from '@tingcode/utils'

// 'development' | 'production'
export const devMicroUrlMap = {
  docs: 'http://localhost:8682/docs/',
  demo: ' http://localhost:8080/',
  modeling: ' http://localhost:8683/modeling/'
}
export const proMicroUrlMap = {
  docs: 'http://159.75.104.173/micro/docs/',
  demo: 'http://159.75.104.173/micro/demo/',
  modeling: 'http://159.75.104.173/micro/modeling/'
}
const IFRAME = ['docs', 'modeling']

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
  if (env === 'production') return proMicroUrlMap[module]
  return devMicroUrlMap[module]
}
