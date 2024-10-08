import { request, BasicResponseModel } from '../init'

export interface IMeta {
  keepAlive?: boolean
  transition?: boolean
  title: string
  affix?: boolean
  icon?: string
  module?: string
  dynamicLevel?: number
  realPath?: string
}

export interface IMenu {
  name: string
  path?: string
  meta: IMeta
  module?: string
  children?: IMenu[]
  auth?: string[]
}

export interface IUserInfo {
  menu: IMenu[]
}

/**
 * @description: 获取用户信息 （前端权限）啊
 */
export function apiGetUserInfo() {
  return request.request<IUserInfo>({
    url: '/admin_info',
    method: 'GET'
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
