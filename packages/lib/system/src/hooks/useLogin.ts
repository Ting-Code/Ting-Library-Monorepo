import { apiLogin } from '../api/apiSystem'
import { ResultEnum } from '@tingcode/request'
import { getURL, PageEnum, setUrl } from './useURL'
import {
  getGlobalDataElement,
  removeGlobalStorageToken,
  setGlobalStorageToken,
  setGlobalUserAuth,
  setGlobalUserInfo
} from '../global-data'

/**
 * @description 登录
 * @param userInfo
 */
export async function loginSystem(userInfo?: any) {
  try {
    const response = await apiLogin(userInfo)
    const { result, code } = response
    if (code === ResultEnum.SUCCESS) {
      setGlobalStorageToken(result.token)
      setGlobalUserInfo(result.userInfo)
      if (getURL()?.query?.redirect) {
        const { redirect, ...query } = getURL()?.query as any
        const toPath = decodeURIComponent((redirect as string) || '/')
        setUrl({ path: toPath, query }, 'pushState')
      } else {
        setUrl({ path: '/' }, 'pushState')
      }
      const { ElMessage } = getGlobalDataElement()
      ElMessage.success('欢迎来到Ting Library知识库！')
      return Promise.resolve(response)
    }
    return Promise.reject(response.message)
  } catch (e) {
    return Promise.reject(e)
  }
}

// 登出
export function logoutSystem() {
  removeGlobalStorageToken()
  setGlobalUserAuth([])
  setGlobalUserInfo({})
  const { pathname, query } = getURL()
  setUrl({ path: PageEnum.BASE_LOGIN, query: { redirect: pathname, ...query } })
}
