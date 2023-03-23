import { defineStore } from 'pinia'
import { store } from '@/store'
import { useDark } from '@vueuse/core'

interface RootSettingState {
  rootTheme: string // 主题
  projectConfig: null // 项目配置
}

export const useRootSettingStore = defineStore({
  id: 'app-root-setting',
  state: (): RootSettingState => ({
    rootTheme: 'light',
    projectConfig: null
  }),
  getters: {
    getRootTheme(): string {
      return this.rootTheme
    }
  },
  actions: {
    // 设置主题
    setRootTheme(value: string): void {
      const isDark = useDark()
      isDark.value = value === 'dark'
      this.rootTheme = value
    }
  }
})

export function useRootSettingStoreWithOut() {
  return useRootSettingStore(store)
}
