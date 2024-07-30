import { apiGetUserInfo } from '../api/apiSystem'
import { setGlobalDataAuth, setGlobalDataMenu } from '../global-data'

/**
 * @description 登录
 * @param userInfo
 */
export async function getUserInfo() {
  try {
    const res = await apiGetUserInfo()
    setGlobalDataAuth([res.auth])
    setGlobalDataMenu([res.menu])
    return res
  } catch (e) {
    return Promise.reject(e)
  }
}
