import { request } from './index.mjs'
export function apiGetUserInfo() {
  return request.request({
    url: '/admin_info',
    method: 'get'
  })
}
export function apiLogin(params) {
  return request.request(
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
export function apiAdminMenus() {
  return request.request({
    url: '/menus',
    method: 'GET'
  })
}
