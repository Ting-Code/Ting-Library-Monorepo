import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, Router } from 'vue-router'
import type { AppRouteRecordRaw } from '@tingcode/system'

export const publicRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/list',
    meta: { title: 'Root' }
  }
]

const modules = import.meta.glob('./modules/**/*.ts', { eager: true })
const routeModuleList: RouteRecordRaw[] = []

Object.keys(modules).forEach((key) => {
  const mod = (modules[key] as { default?: RouteRecordRaw | RouteRecordRaw[] }).default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export const constantRouter = [
  ...publicRoutes,
  ...routeModuleList,
  { path: '/:pathMatch(.*)*', redirect: '/list' }
] as RouteRecordRaw[]

let router: Router | null = null

export function initRouter() {
  return createRouter({
    history: createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || '/i18n/'),
    routes: constantRouter,
    scrollBehavior: () => ({ left: 0, top: 0 })
  })
}

export function unmountRouter() {
  router?.clearRoutes()
  router = null
}

export function setupRouter(app: App) {
  router = initRouter()
  app.use(router)
}
