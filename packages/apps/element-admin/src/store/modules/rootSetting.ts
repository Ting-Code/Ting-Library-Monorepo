import { defineStore } from 'pinia'
import { store } from '@/store'
import { useDark } from '@vueuse/core'

interface RootSettingState {
  rootTheme: string // 主题
  isOpenSetting: boolean // 是否打开设置
  isOpenSlider: boolean // 侧边栏
  isOpenFull: boolean // 全屏
}

export const useRootSettingStore = defineStore({
  id: 'app-root-setting',
  state: (): RootSettingState => ({
    rootTheme: 'dark',
    isOpenSetting: false,
    isOpenSlider: false,
    isOpenFull: false
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
