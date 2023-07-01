import type { RouteRecordRaw } from 'vue-router'
import { isNavigationFailure, Router } from 'vue-router'
import { useUserStoreWidthOut, ACCESS_TOKEN } from '@/store/modules/user'
import { useAsyncRouteStoreWidthOut } from '@/store/modules/asyncRoute'
import { storage } from '@common/utils'
import { PageEnum } from './type'
import { ErrorPageRoute } from '@/router/routerBase.js'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'

const LOGIN_PATH = PageEnum.BASE_LOGIN
const ERROR_PAGE_NAME = PageEnum.ERROR_PAGE_NAME

const whitePathList = [LOGIN_PATH] // 一级白名单

export function createRouterGuards(router: Router) {
  const userStore = useUserStoreWidthOut()
  const asyncRouteStore = useAsyncRouteStoreWidthOut()
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
    const token = storage.get(ACCESS_TOKEN)
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

    if (asyncRouteStore.getIsDynamicAddedRoute) {
      next()
      return
    }
    const userInfo = await userStore.GetInfo()
    const routes = await asyncRouteStore.generateRoutes(userInfo)
    // 动态添加可访问路由表
    routes.forEach((item) => {
      router.addRoute(item as unknown as RouteRecordRaw)
    })
    //添加404
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name)
    if (isErrorPage === -1) {
      router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw)
    }
    // 重定向 到原来页面
    const redirectPath = (from.query.redirect || to.path) as string
    const redirect = decodeURIComponent(redirectPath)
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
    asyncRouteStore.setDynamicAddedRoute(true) // 设置为true那么就不会刷新权限
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
    const asyncRouteStore = useAsyncRouteStoreWidthOut()
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
    console.log(error, '路由错误')
  })
}
