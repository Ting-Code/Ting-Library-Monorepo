import { defineStore } from 'pinia'
import { store } from '@/store'
import { constantRouter } from '@/router'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { IMenu } from '@tingcode/system/apiSystem'

export interface IUserState {
  menu: IMenu[]
  auth: Omit<IMenu, 'children'>[]
  routers: any[]
  addRouters: any[]
  keepAliveComponents: string[]
  isDynamicAddedRoute: boolean
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    menu: [],
    auth: [],
    routers: constantRouter,
    addRouters: [],
    keepAliveComponents: [],
    isDynamicAddedRoute: false
  }),
  getters: {
    getMenu(): IMenu[] {
      return this.menu
    },
    getAuth(): Omit<IMenu, 'children'>[] {
      return this.auth
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    }
  },
  actions: {
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    setRouters(routers) {
      this.addRouters = routers
      this.routers = constantRouter.concat(routers)
    },
    setMenu(menu: IMenu[]) {
      this.menu = menu
    },
    setAuth(auth: Omit<IMenu, 'children'>[]) {
      this.auth = auth
    },
    setKeepAliveComponents(compNames) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames
    },
    delKeepAliveCompName(_route?: RouteLocationNormalizedLoaded | { name: string }) {
      const route = _route || useRoute()
      this.keepAliveComponents = this.keepAliveComponents.filter((item) => item !== route.name)
    }
  }
})

export function useUserStoreWidthOut() {
  return useUserStore(store)
}
