import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export type RouteViewComponent<T = unknown> = Component | (() => Promise<T>)

export interface RouteMeta {
  title: string
  affix?: boolean
  icon?: string
  transition?: boolean
  keepAlive?: boolean
  module?: string
  disabled?: boolean
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  name?: string
  module?: string
  meta?: RouteMeta
  component?: RouteViewComponent | string
  components?: RouteViewComponent
  children?: AppRouteRecordRaw[]
  props?: Record<string, unknown>
  fullPath?: string
}

/** @deprecated 使用 RouteMeta */
export type Meta = RouteMeta
