import { useRoute, useRouter, Router } from 'vue-router'
import { RouteItem, TABS_ROUTES, useTabsStoreWidthOut } from '@/store/modules/tabs'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { unref } from 'vue'
import { PageEnum } from '@/router/type'
import { createStorage } from '@common/utils'
import { useGo, useRedo } from '@/hooks/usePage'
import { toRaw } from 'vue'
export const useTabs = (_router?: Router) => {
  const router = useRouter()
  const tabsStore = useTabsStoreWidthOut()
  const asyncRouteStore = useAsyncRouteStore()
  const Storage = createStorage({ storage: localStorage })
  const _route_ = useRoute()
  const _router_ = _router || useRouter()
  const { currentRoute } = router

  /**
   * @description 跳转路由到上一个页面（判断为空则跳转到首页）
   */
  const goToPage = async (_router?: Router) => {
    const router = _router || _router_
    const go = useGo(router)
    const len = tabsStore.getTabsList.length
    const { path } = unref(router.currentRoute)

    let toPath: PageEnum | string = PageEnum.BASE_HOME

    if (len > 0) {
      const page = tabsStore.getTabsList[len - 1]
      const p = page.fullPath || page.path
      if (p) {
        toPath = p
      }
    }
    path !== toPath && (await go(toPath as PageEnum, true))
    if (len <= 0) {
      addTabsList(getRouteItem(_route_))
    }
  }

  /**
   * @description 获取当前路由Tabs
   */
  const getCurrentTab = () => {
    const route = unref(currentRoute)
    return tabsStore.getTabsList.find((item) => item.fullPath === route.fullPath)!
  }

  /**
   * @description 更新 tab title （用于详情页插入：id信息）
   */
  const setTabsTitle = async (title: string, tab?: RouteItem) => {
    const targetTab = tab || getCurrentTab()
    const findTab = tabsStore.getTabsList.find((item) => item === targetTab)
    if (findTab) {
      findTab.meta.title = title
    }
  }

  /**
   * @description 更新 tab title （用于详情页插入：id信息）
   */
  const setTabsPath = async (path: string, tab?: RouteItem) => {
    const targetTab = tab || getCurrentTab()
    const findTab = tabsStore.getTabsList.find((item) => item === targetTab)
    if (findTab) {
      findTab.fullPath = path
      findTab.path = path
    }
  }

  /**
   * @description 刷新页面
   */
  const reloadPage = async () => {
    asyncRouteStore.delKeepAliveCompName()
    const redo = useRedo(router)
    await redo()
  }

  /**
   * @description 关闭全部
   */
  const closeAll = () => {
    const tabsList = tabsStore.getTabsList.filter((item) => item?.meta?.affix ?? false)
    tabsStore.setTabsLiat(tabsList)
    goToPage()
  }

  /**
   * @description 关闭指定页面（默认当前页面）
   * @param _tab
   * @param _router
   */
  const removeTab = async (_tab?: RouteItem, _router?: Router) => {
    const tab = _tab || (_route_ as RouteItem)
    const router = _router || _router_

    const close = (route: RouteItem) => {
      const { fullPath, meta: { affix } = {} } = route

      if (affix) {
        return
      }
      const tabsList = tabsStore.getTabsList
      const index = tabsList.findIndex((item) => item.fullPath === fullPath)
      index !== -1 && tabsList.splice(index, 1)
      console.log('')
      tabsStore.setTabsLiat(tabsList)
    }

    const { currentRoute } = router

    const { path } = unref(currentRoute)
    if (path !== tab.path) {
      // 关闭非当前页面
      close(tab)
      // 清楚缓存
      asyncRouteStore.delKeepAliveCompName(tab)
      return
    }

    close(tab)
    await goToPage()
  }

  const removeTabByName = async (name: string) => {
    const tab = tabsStore.getTabsList.find((item) => item.name === name || item.fullPath === name)
    if (tab) {
      await removeTab(tab)
    }
  }

  /**
   * @description 初始化更新Tabs
   */
  const initTabs = () => {
    const { path, fullPath, meta, name, params, query, hash } = _route_
    const routerItem = { path, fullPath, meta, name, params, query, hash }
    const routesStr = Storage.get(TABS_ROUTES) as string | null | undefined
    let cacheRoutes: RouteItem[] = []
    try {
      cacheRoutes = routesStr ? JSON.parse(routesStr) : [routerItem]
    } catch (e) {
      cacheRoutes = [routerItem as RouteItem]
    }
    // 将最新的路由信息同步到 localStorage 中
    const routes = router.getRoutes()
    cacheRoutes.forEach((cacheRoute) => {
      const route = routes.find((route) => route.path === cacheRoute.path)
      if (route) {
        cacheRoute.meta = route.meta || cacheRoute.meta
        cacheRoute.name = (route.name || cacheRoute.name) as string
      }
    })
    tabsStore.setTabsLiat(cacheRoutes)
  }

  const addTabsList = (route: RouteItem) => {
    tabsStore.addTab(route)
  }

  const getRouteItem = (route): RouteItem => {
    const { fullPath, hash, meta, name, params, path, query } = route
    return { fullPath, hash, meta, name, params, path, query }
  }

  // 在页面关闭或刷新之前，保存数据
  const setStorageTabs = () => {
    Storage.set(TABS_ROUTES, JSON.stringify(toRaw(tabsStore.getTabsList)))
  }

  const getTabsList = () => {
    return tabsStore.getTabsList
  }

  return {
    goToPage,
    getCurrentTab,
    setTabsTitle,
    setTabsPath,
    reloadPage,
    closeAll,
    removeTab,
    removeTabByName,
    addTabsList,
    getRouteItem,
    setStorageTabs,
    initTabs,
    getTabsList
  }
}
