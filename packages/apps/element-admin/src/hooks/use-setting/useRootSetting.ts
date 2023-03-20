import { useRootSettingStoreWithOut } from '@/store/modules/rootSetting'
import { computed } from 'vue'

export const useRootSetting = () => {
  const rootSettingStore = useRootSettingStoreWithOut()

  const getRootTheme = computed(() => rootSettingStore.getRootTheme)

  const setRootTheme = (value: string) => {
    rootSettingStore.setRootTheme(value)
  }

  return {
    getRootTheme,
    setRootTheme
  }
}
