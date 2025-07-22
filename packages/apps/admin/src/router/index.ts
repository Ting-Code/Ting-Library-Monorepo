import { App } from 'vue'
import type { AppRouteRecordRaw } from '@/router/type'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { createRouterGuards } from './routerGuards.js'
import { PageEnum } from '@tingcode/system'
export const ErrorPage = () => import('@/views/common/error/404.vue')
const Layout = () => import('@/views/layouts/default/index.vue')

export const publicRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/common/login/index.vue'),
    meta: {
      title: 'Ting Library'
    }
  },
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
      title: 'Root'
    }
  }
]
// 404 on a page
export const ErrorPageRoute: AppRouteRecordRaw = {
  path: '/:module(.*)*',
  name: 'ErrorPage',
  component: Layout,
  meta: {
    title: 'ErrorPage'
  },
  children: [
    {
      path: '/:module(.*)*/redirect/:path(.*)*',
      name: PageEnum.REDIRECT_NAME,
      component: () => import('@/views/common/redirect/index.vue'),
      meta: {
        title: PageEnum.REDIRECT_NAME
      }
    },
    {
      path: '/:module(.*)*',
      name: 'ErrorPageSon',
      component: ErrorPage,
      meta: {
        title: 'ErrorPage'
      }
    }
  ]
}
export const RedirectRouter: AppRouteRecordRaw = {
  path: '/redirect',
  component: Layout,
  name: 'redirect',
  meta: {
    title: PageEnum.REDIRECT_NAME
  },
  children: [
    {
      path: '/redirect/:path(.*)/:_redirect_type(.*)/:_origin_params(.*)',
      name: PageEnum.REDIRECT_NAME,
      component: () => import('@/views/common/redirect/index.vue'),
      meta: {
        title: PageEnum.REDIRECT_NAME
      }
    }
  ]
}

const modules: any = import.meta.glob('./modules/**/*.ts', { eager: true })
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
export const constantRouter: any[] = [...publicRoutes, RedirectRouter]

// 创建路由
const router = createRouter({
  // history: process.env.NODE_ENV === 'production' ? createWebHistory() : createWebHashHistory(),
  history: createWebHistory(''),
  routes: constantRouter as unknown as RouteRecordRaw[],
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

/**
 * @description 初始化router
 * @param app
 */
export function setupRouter(app: App<Element>) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}

export default router
