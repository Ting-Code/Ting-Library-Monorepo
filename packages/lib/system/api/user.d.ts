export interface BasicResponseModel<T = any> {
  code: number
  message: string
  result: T
}
/**
 * @description: 获取用户信息 （前端权限）啊
 */
export declare function apiGetUserInfo(): Promise<any>
/**
 * @description: 用户登录
 */
export declare function apiLogin(params: any): Promise<BasicResponseModel<any>>
/**
 * @description: 根据用户id获取用户菜单 （后端权限）
 */
export declare function apiAdminMenus(): Promise<any>
