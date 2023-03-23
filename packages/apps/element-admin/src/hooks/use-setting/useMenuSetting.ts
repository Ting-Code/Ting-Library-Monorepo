import { computed, unref } from 'vue'

import { useRootSettingStoreWithOut } from '@/store/modules/rootSetting'
import { MenuSetting } from '@/setting/menu'

export const useMenuSetting = () => {
  const appStore = useRootSettingStoreWithOut()

  // menu是否折叠
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)

  const setMenuSetting = (menuSetting: Partial<MenuSetting>): void => {
    appStore.setProjectConfig({ menuSetting })
  }

  const toggleCollapsed = () => {
    setMenuSetting({
      collapsed: !unref(getCollapsed)
    })
  }
  return {
    setMenuSetting,
    toggleCollapsed,
    getCollapsed
  }
}
