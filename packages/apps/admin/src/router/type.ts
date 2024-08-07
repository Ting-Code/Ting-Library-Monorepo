import type { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'
import { Recordable } from 'vite-plugin-mock'

export type Component<T = any> = ReturnType<typeof defineComponent> | (() => Promise<T>)

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  name?: string
  module?: string
  meta?: Meta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
}

export interface Meta {
  // 名称
  title: string
  // 是否固定在tab上
  affix?: boolean
  // tab上的图标
  icon?: string
  // 是否进入动画
  transition?: boolean
  keepAlive?: boolean
}
