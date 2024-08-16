import { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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
export const constantRouter: any[] = [...routeModuleList, ErrorPageRoute]

// 创建路由
const router = createRouter({
  // history: process.env.NODE_ENV === 'production' ? createWebHistory() : createWebHashHistory(),
  history: createWebHistory(import.meta.env.PROD ? '/docs' : '/docs'),
  routes: constantRouter as unknown as RouteRecordRaw[],
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

/**
 * @description 初始化router
 * @param app
 */
export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
