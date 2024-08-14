import { getURL } from './url'
import { getGlobalDataAuth, getGlobalDataEnv } from '../global-data'
import { error } from '@tingcode/utils'

// 'development' | 'production'
export const devMicroUrlMap = {
  docs: 'http://localhost:8680/'
}
//
export const useMicro = () => {
  const { pathname } = getURL()
  const auth = getGlobalDataAuth()
  const ENV = getGlobalDataEnv()
  const route = auth?.find((route) => route.path === pathname)
  console.log('==========', pathname, auth, route)
  if (route && route?.meta?.module && ENV?.env) {
    return {
      name: route.meta.module,
      url: getMicroUrl(route.meta.module, ENV.env)
    }
  }
  return error(`${ENV?.env} not found ${route?.meta?.module} model`)
}

export function getMicroUrl(module: string, env: 'development' | 'production' | 'test') {
  if (env === 'production') return `http://139.199.173.241/${module}/`
  return devMicroUrlMap[module]
}
