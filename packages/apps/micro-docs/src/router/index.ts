import { App } from 'vue'
import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'
import type { AppRouteRecordRaw } from '@apps/admin/src/router/type'
export const ErrorPage = () => import('@/views/common/error/404.vue')

// 404 on a page
export const ErrorPageRoute = {
  path: '/:path(.*)*',
  name: 'ErrorPageSon',
  component: ErrorPage,
  meta: {
    title: 'ErrorPage'
  }
}

export const publicRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/system/home',
    meta: {
      title: 'Root'
    }
  }
]

const modules: any = import.meta.glob('./modules/**/*.ts', { eager: true })
const routeModuleList: RouteRecordRaw[] = []
// 私有路由(需要权限才能放行)
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

//需要验证权限
export const asyncRoutes = [...routeModuleList]
//普通路由 无需验证权限
export const constantRouter: any[] = [...routeModuleList, ErrorPageRoute, ...publicRoutes]

let router: null | Router = null
export function initRouter() {
  // 创建路由
  return createRouter({
    // history: process.env.NODE_ENV === 'production' ? createWebHistory() : createWebHashHistory(),
    history: createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || '/docs/'),
    routes: constantRouter as unknown as RouteRecordRaw[],
    scrollBehavior() {
      return { left: 0, top: 0 }
    }
  })
}

// 重置动态路由
export function unmountRouter() {
  if (!router) return
  router.clearRoutes()
  router = null
}

/**
 * @description 初始化router
 * @param app
 */
export function setupRouter(app: App<Element>) {
  router = initRouter()
  app.use(router)
}

export default router
