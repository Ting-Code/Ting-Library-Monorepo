import { defineStore } from 'pinia'
import { RouteLocationNormalized } from 'vue-router'
import { store } from '@/store'
import { PageEnum } from '@/router/type'
import { toRaw } from 'vue'
export const TABS_ROUTES = 'TABS_ROUTES'
// 不需要出现在标签页中的路由
const whiteList: string[] = [
  PageEnum.BASE_LOGIN_NAME,
  PageEnum.REDIRECT_NAME,
  PageEnum.ERROR_PAGE_NAME
]

export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string
  path: string
  name: string
  hash: string
  meta: object
  params: object
  query: object
}

export type ITabsViewState = {
  tabsList: RouteItem[] // 标签页
}

export const useTabsStore = defineStore({
  id: 'app-tabs-view',
  state: (): ITabsViewState => ({
    tabsList: []
  }),
  getters: {
    getTabsList(): RouteItem[] {
      return this.tabsList
    }
  },
  actions: {
    setTabsList(tabsList: RouteItem[]) {
      this.tabsList = tabsList
    },
    addTab(route: RouteItem): boolean {
      const { path, fullPath, params, query, meta } = route
      if (whiteList.includes(route.name)) return false
      let updateIndex = -1
      // 如果该选项卡已经存在，则执行更新操作
      const tabHasExits = this.tabsList.some((tab, index) => {
        updateIndex = index
        return tab.path === path
      })

      // 如果该选项卡已经存在，则执行更新操作
      if (tabHasExits) {
        const curTab = toRaw(this.tabsList)[updateIndex]
        if (!curTab) {
          return false
        }
        curTab.params = params || curTab.params
        curTab.query = query || curTab.query
        curTab.fullPath = fullPath || curTab.fullPath
        this.tabsList.splice(updateIndex, 1, curTab)
      } else {
        // Add tab
        // 获取动态路由打开数，超过 0 即代表需要控制打开数
        const dynamicLevel = meta?.dynamicLevel ?? -1
        if (dynamicLevel > 0) {
          // 如果动态路由层级大于 0 了，那么就要限制该路由的打开数限制了
          // 首先获取到真实的路由，使用配置方式减少计算开销.
          // const realName: string = path.match(/(\S*)\//)![1];
          const realPath = meta?.realPath ?? ''
          // 获取到已经打开的动态路由数, 判断是否大于某一个值
          if (
            this.tabsList.filter((e) => e.meta?.realPath ?? '' === realPath).length >= dynamicLevel
          ) {
            // 关闭第一个
            const index = this.tabsList.findIndex((item) => item.meta.realPath === realPath)
            index !== -1 && this.tabsList.splice(index, 1)
          }
        }
        this.tabsList.push(route)
      }
      return true
    }
  }
})

export function useTabsStoreWidthOut() {
  return useTabsStore(store)
}
