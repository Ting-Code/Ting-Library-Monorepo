import NProgress from 'nprogress'
import type { RouteRecordRaw } from 'vue-router'
import { asyncRoutes, ErrorPageRoute } from '@/router'
// import { groupBy } from '@tingcode/utils'
import 'nprogress/nprogress.css'
import { isNavigationFailure, Router } from 'vue-router'
import { useUserStoreWidthOut } from '@/store/modules/user'
import { PageEnum, getGlobalStorageToken, getUserInfo } from '@tingcode/system'
import { IMenu } from '@tingcode/system/apiSystem'
import { AppRouteRecordRaw } from '@/router/type'
const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>()
const ParentLayout = () => import('@/views/layouts/parentLayout/index.vue')
const Iframe = () => import('@/views/common/iframe/index.vue')
const Layout = () => import('@/views/layouts/default/index.vue')
const Micro = () => import('@/views/layouts/micro/index.vue')
LayoutMap.set('LAYOUT', Layout)
LayoutMap.set('IFRAME', Iframe)
LayoutMap.set('ParentLayout', ParentLayout)

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
      const addRouters = generateRoutes(transRouter(menu))
      userStore.setAuth(auth)
      userStore.setMenu(menu)
      userStore.setRouters(addRouters)
      // 动态添加可访问路由表
      addRouters.forEach((item) => {
        router.addRoute(item as unknown as RouteRecordRaw)
      })
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
      console.log('failed navigation', failure)
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

/**
 * 递归拍平菜单树形结构
 * @param menu 树形菜单结构
 * @returns 拍平后的菜单数组
 */
function flattenMenu(menu: IMenu[]): Omit<IMenu, 'children'>[] {
  return menu.reduce(
    (acc, item) => {
      // 复制当前项，排除children
      const { children, ...rest } = item
      acc.push(rest)

      // 递归处理子菜单
      if (children && children.length > 0) {
        acc.push(...flattenMenu(children))
      }

      return acc
    },
    [] as Omit<IMenu, 'children'>[]
  )
}

/**
 * 按module来分组，没有module的分为admin组
 * @param menu 树形菜单结构
 */
export function transRouter(menu: IMenu[]): AppRouteRecordRaw[] {
  // 拍平菜单结构
  const flatMenu = flattenMenu(menu)

  // 分组，没有module的归入admin组
  const grouped = flatMenu.reduce(
    (acc, item) => {
      const module = item.meta?.module || 'admin'
      if (!acc[module]) {
        acc[module] = []
      }
      acc[module].push(item)
      return acc
    },
    {} as Record<string, Omit<IMenu, 'children'>[]>
  )

  return Object.keys(grouped).map((key) => ({
    name: key,
    component: 'LAYOUT',
    path: `/${key}`,
    redirect: grouped[key]?.[0]?.path || '/',
    children: grouped[key].map((item) => ({
      component: item?.name,
      path: item?.path || '',
      ...item
    }))
  }))
}

/**格式化 后端 结构信息并递归生成层级路由表
 * @param routerMap
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
  }
  const router = asyncRoutes.find((router) => {
    return router.name === routerItem.name
  })
  if (router?.component) return router?.component
  if (routerItem.children && routerItem.children.length > 0) {
    return ParentLayout
  }
  return Micro
}
