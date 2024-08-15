import { storeToRefs } from 'pinia'
import { useSettingStoreWithOut } from '@/store/modules/setting'
import {
  emitIsOpenSetting,
  emitIsOpenSlider,
  emitIsOpenFull,
  emitTheme,
  onTheme,
  onIsOpenFull,
  onIsOpenSetting,
  onIsOpenSlider,
  fooMitt
} from '@tingcode/system'

export const NAMESPACE = 'docs'

export const useSetting = () => {
  const rootSettingStore = useSettingStoreWithOut()

  const setRootTheme = (value: string) => {
    emitTheme(value)
  }

  const {
    isOpenSetting: isOpenSettingRef,
    isOpenSlider: isOpenSliderRef,
    isOpenFull: isOpenFullRef,
    getRootTheme
  } = storeToRefs(rootSettingStore)
  const toggleIsOpenSetting = () => {
    emitIsOpenSetting(!isOpenSettingRef.value)
  }

  const toggleIsOpenSlider = () => {
    emitIsOpenSlider(!isOpenSliderRef.value)
  }

  const toggleIsOpenFull = () => {
    emitIsOpenFull(!isOpenFullRef.value)
  }

  return {
    getRootTheme,
    setRootTheme,
    isOpenSettingRef,
    toggleIsOpenSetting,
    isOpenSliderRef,
    toggleIsOpenSlider,
    isOpenFullRef,
    toggleIsOpenFull
  }
}

export const initSettingMitt = () => {
  const rootSettingStore = useSettingStoreWithOut()

  const setRootTheme = (value: string) => {
    rootSettingStore.setRootTheme(value)
  }
  const setIsOpenSetting = (value: boolean) => {
    rootSettingStore.$patch({ isOpenSetting: value })
  }
  const setIsOpenFull = (value: boolean) => {
    rootSettingStore.$patch({ isOpenFull: value })
  }
  const setIsOpenSlider = (value: boolean) => {
    rootSettingStore.$patch({ isOpenSlider: value })
  }
  onTheme(setRootTheme)
  onIsOpenSetting(setIsOpenSetting)
  onIsOpenFull(setIsOpenFull)
  onIsOpenSlider(setIsOpenSlider)

  return () => {
    fooMitt('isOpenSetting', setIsOpenSetting)
    fooMitt('isOpenSlider', setIsOpenSlider)
    fooMitt('isOpenFull', setIsOpenFull)
    fooMitt('theme', setRootTheme)
  }
}
