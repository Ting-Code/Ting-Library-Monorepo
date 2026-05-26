import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import { store } from '@/store'

interface RootSettingState {
  rootTheme: string
}

export const useSettingStore = defineStore('i18n-root-setting', {
  state: (): RootSettingState => ({
    rootTheme: 'dark'
  }),
  getters: {
    getRootTheme(): string {
      return this.rootTheme
    }
  },
  actions: {
    setRootTheme(value: string): void {
      const isDark = useDark()
      isDark.value = value === 'dark'
      this.rootTheme = value
    }
  }
})

export function useSettingStoreWithOut() {
  return useSettingStore(store)
}
