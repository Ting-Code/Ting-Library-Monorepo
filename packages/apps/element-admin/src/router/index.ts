import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { createRouterGuards } from './routerGuards.js'
import { App } from 'vue'
import { publicRoutes } from '@/router/routerBase.js'

const modules: any = import.meta.globEager('./modules/**/*.ts')
const routeModuleList: RouteRecordRaw[] = []
// 私有路由(需要权限才能放行)
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

// 遍历路由数获取路由List 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = []
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name)
    getRouteNames(item.children || [])
  })
getRouteNames(publicRoutes)

//需要验证权限
export const asyncRoutes = [...routeModuleList]

//普通路由 无需验证权限
export const constantRouter: any[] = [...publicRoutes]

// 创建路由
const router = createRouter({
  // history: process.env.NODE_ENV === 'production' ? createWebHistory() : createWebHashHistory(),
  history: createWebHashHistory(''),
  routes: publicRoutes as unknown as RouteRecordRaw[],
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

// 重置动态路由
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function setupRouter(app: App<Element>) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}

export default router
