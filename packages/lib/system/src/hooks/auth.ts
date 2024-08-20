import { getUrl } from './router'
import { getGlobalDataAuth } from '../global-data'
import { error, isArray, isString } from '@tingcode/utils'

export function getAuthPathList(): string[] {
  const url = getUrl()
  const authList = getGlobalDataAuth()
  if (!authList || !authList.length) return []
  const authPathList = authList.find((item) => item.path === url?.pathname)
  return authPathList ? authPathList?.auth || [] : []
}

/**
 * 判断是否存在权限
 * @param accesses
 * */
export function hasAuth(accesses: string[] | string): boolean {
  const auth = getAuthPathList()
  if (isString(accesses)) {
    return auth.includes(accesses as string)
  }
  if (isArray(accesses)) {
    return auth.some((item) => {
      return accesses.includes(item)
    })
  }
  return error(`[hasAuth]: ${accesses} should be a array or string !`)
}

/**
 * 是否包含指定的所有权限
 * @param accesses
 */
export function hasEveryAuth(accesses: string[]): boolean {
  const auth = getAuthPathList()
  if (isArray(accesses)) {
    return auth.every((access: string) => accesses.includes(access))
  }
  throw new Error(`[hasEveryAuth]: ${accesses} should be a array !`)
}
