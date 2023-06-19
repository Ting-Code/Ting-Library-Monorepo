import { useRootSettingStoreWithOut } from '@/store/modules/rootSetting'
import { storeToRefs } from 'pinia'

export const useRootSetting = () => {
  const rootSettingStore = useRootSettingStoreWithOut()

  const setRootTheme = (value: string) => {
    rootSettingStore.setRootTheme(value)
  }

  const {
    isOpenSetting: isOpenSettingRef,
    isOpenSlider: isOpenSliderRef,
    getRootTheme
  } = storeToRefs(rootSettingStore)
  const toggleIsOpenSetting = () => {
    rootSettingStore.$patch({ isOpenSetting: !isOpenSettingRef.value })
  }

  const toggleIsOpenSlider = () => {
    rootSettingStore.$patch({ isOpenSlider: !isOpenSliderRef.value })
  }

  return {
    getRootTheme,
    setRootTheme,
    isOpenSettingRef,
    toggleIsOpenSetting,
    isOpenSliderRef,
    toggleIsOpenSlider
  }
}
