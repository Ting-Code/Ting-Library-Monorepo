import { useRootSettingStoreWithOut } from '@/store/modules/rootSetting'
import { storeToRefs } from 'pinia'

export const useRootSetting = () => {
  const rootSettingStore = useRootSettingStoreWithOut()

  const setRootTheme = (value: string) => {
    rootSettingStore.setRootTheme(value)
  }
  const { isOpenSetting, isOpenSlider, getRootTheme } = storeToRefs(rootSettingStore)
  const toggleIsOpenSetting = () => {
    console.log('22', isOpenSetting.value)
    rootSettingStore.$patch({ isOpenSetting: !isOpenSetting.value })
  }
  const toggleIsOpenSlider = () => {
    rootSettingStore.$patch({ isOpenSlider: !isOpenSlider.value })
  }

  return {
    getRootTheme,
    setRootTheme,
    isOpenSetting,
    toggleIsOpenSetting,
    isOpenSlider,
    toggleIsOpenSlider
  }
}
