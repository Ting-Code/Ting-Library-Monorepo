import { request } from './index'

export interface BasicResponseModel<T = any> {
  code: number
  message: string
  result: T
}

/**
 * @description: 获取用户信息 （前端权限）啊
 */
export function apiGetUserInfo() {
  return request.request({
    url: '/admin_info',
    method: 'get'
  })
}

/**
 * @description: 用户登录
 */
export function apiLogin(params: any) {
  return request.request<BasicResponseModel>(
    {
      url: '/login',
      method: 'POST',
      params
    },
    {
      isTransformResponse: false
    }
  )
}

/**
 * @description: 根据用户id获取用户菜单 （后端权限）
 */
export function apiAdminMenus() {
  return request.request({
    url: '/menus',
    method: 'GET'
  })
}
