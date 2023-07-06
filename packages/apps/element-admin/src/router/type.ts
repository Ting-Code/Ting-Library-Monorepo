import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'
import { Recordable } from 'vite-plugin-mock'

export type Component<T = any> = ReturnType<typeof defineComponent> | (() => Promise<T>)

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
}

export interface Meta {
  // 名称
  title: string
  // 是否忽略权限
  ignoreAuth?: boolean
  permissions?: string[]
  // 是否不缓存
  noKeepAlive?: boolean
  // 是否固定在tab上
  affix?: boolean
  // tab上的图标
  icon?: string
  // 跳转地址
  frameSrc?: string
  // 外链跳转地址
  externalLink?: string
  //隐藏
  hidden?: boolean
}

export interface Menu {
  title: string
  label: string
  key: string
  meta: RouteMeta
  name: string
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
  icon?: any
  path: string
  permissions?: string[]
  redirect?: string
  sort?: number
}

export enum PageEnum {
  // 登录
  BASE_LOGIN = '/login',
  BASE_LOGIN_NAME = 'Login',
  //重定向
  REDIRECT = '/redirect',
  REDIRECT_NAME = 'Redirect',
  // 首页
  BASE_HOME = '/system/home',
  BASE_HOME_NAME = 'system_home',
  //首页跳转默认路由
  BASE_HOME_REDIRECT = '/dashboard/console',
  // 错误
  ERROR_PAGE_NAME = 'ErrorPage'
}
