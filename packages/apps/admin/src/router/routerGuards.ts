import type { RouteRecordRaw } from 'vue-router'
import { asyncRoutes, ErrorPageRoute } from '@/router'

import { groupBy } from '@tingcode/utils'
import 'nprogress/nprogress.css'
import { isNavigationFailure, Router } from 'vue-router'
import { useUserStoreWidthOut } from '@/store/modules/user'
import { PageEnum, getGlobalStorageToken, getUserInfo } from '@tingcode/system'
import { IMenu } from '@tingcode/system/apiSystem'
import NProgress from 'nprogress'
import { AppRouteRecordRaw } from '@/router/type'
const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>()
const ParentLayout = () => import('@/views/layouts/parentLayout/index.vue')
const Iframe = () => import('@/views/common/iframe/index.vue')
const Layout = () => import('@/views/layouts/default/index.vue')

LayoutMap.set('LAYOUT', Layout)
LayoutMap.set('IFRAME', Iframe)

const LOGIN_PATH = PageEnum.BASE_LOGIN
const ERROR_PAGE_NAME = PageEnum.ERROR_PAGE_NAME

const whitePathList = [LOGIN_PATH] // 一级白名单

export function createRouterGuards(router: Router) {
  const userStore = useUserStoreWidthOut()
  /**
   * @description 路由跳转前执行守卫
   */
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    // 登录后如果重定向失败即重定向到首页
    if (from.path === LOGIN_PATH && to.name === ERROR_PAGE_NAME) {
      next(PageEnum.BASE_HOME)
      return
    }
    // Whitelist can be directly entered 白名单
    if (whitePathList.includes(to.path as PageEnum)) {
      next()
      return
    }
    const token = getGlobalStorageToken()
    if (!token) {
      // 无token情况下可配置ignoreAuth跳过路由鉴权
      if (to.meta.ignoreAuth) {
        next()
        return
      }
      // 重定向登录页面 (登录后会重定向回来)
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        }
      }
      next(redirectData)
      return
    }

    if (userStore.getIsDynamicAddedRoute) {
      next()
      return
    }
    try {
      const userStore = useUserStoreWidthOut()
      const { auth, menu } = await getUserInfo()
      const addRouters = generateRoutes(transRouter(auth))
      userStore.setAuth(auth)
      userStore.setMenu(menu)
      userStore.setRouters(addRouters)
      // 动态添加可访问路由表
      addRouters.forEach((item) => {
        router.addRoute(item as unknown as RouteRecordRaw)
      })
      console.log('======router', addRouters, router.currentRoute)
    } catch (error) {
      console.log(error)
    }

    //添加404
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name)
    if (isErrorPage === -1) {
      router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw)
    }
    // 重定向 到原来页面
    const redirectPath = (from.query.redirect || to.path) as string
    const redirect = decodeURIComponent(redirectPath)
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
    userStore.setDynamicAddedRoute(true) // 设置为true那么就不会刷新权限
    next(nextData)
    NProgress.done()
  })
  /**
   * @description 路由跳转后执行守卫
   */
  router.afterEach((to, _, failure) => {
    document.title = (to?.meta?.title as string) || document.title
    if (isNavigationFailure(failure)) {
      //console.log('failed navigation', failure)
    }
    const asyncRouteStore = useUserStoreWidthOut()
    // 在这里设置需要缓存的组件名称
    const keepAliveComponents = asyncRouteStore.keepAliveComponents
    const currentComName: any = to.matched.find((item) => item.name == to.name)?.name
    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName)
    } else if (!to.meta?.keepAlive || to.name === 'Redirect') {
      // 不需要缓存的组件
      const index = asyncRouteStore.keepAliveComponents.findIndex((name) => name == currentComName)
      if (index != -1) {
        keepAliveComponents.splice(index, 1)
      }
    }
    asyncRouteStore.setKeepAliveComponents(keepAliveComponents)
    NProgress.done()
  })

  router.onError((error) => {
    console.error(error, '路由错误')
  })
}

export function transRouter(auth: Omit<IMenu, 'children'>[]): AppRouteRecordRaw[] {
  const grouped = groupBy(auth, 'module')
  return Object.keys(grouped).map((key) => ({
    name: key,
    component: 'LAYOUT',
    path: `/${key}`,
    children: grouped[key].map((item) => ({
      component: item?.name,
      path: item?.path || '',
      ...item
    }))
  }))
}

/**格式化 后端 结构信息并递归生成层级路由表
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export function generateRoutes(routerMap): AppRouteRecordRaw[] {
  const currentRoutes = routerMap.map((item) => {
    const currentRoute: any = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path,
      name: item.name ?? '',
      component: dynamicComponent(item),
      meta: {
        ...item.meta
      }
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRoute.path = currentRoute.path.replace('//', '/')
    // 重定向
    item.redirect && (currentRoute.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      //如果未定义 redirect 默认第一个子路由为 redirect
      !item.redirect && (currentRoute.redirect = item.children[0].path)
      currentRoute.children = generateRoutes(item.children)
    }
    return currentRoute
  })
  return currentRoutes
}

/**
 * 动态导入
 * */
export function dynamicComponent(routerItem: AppRouteRecordRaw) {
  const component = routerItem?.component
  if (component) {
    const layoutFound = LayoutMap.get(component as string)
    if (layoutFound) return layoutFound
    const router = asyncRoutes.find((router) => {
      return router.name === routerItem.name
    })
    if (router?.component) return router?.component
    return ParentLayout
  } else {
    return ParentLayout
  }
}
