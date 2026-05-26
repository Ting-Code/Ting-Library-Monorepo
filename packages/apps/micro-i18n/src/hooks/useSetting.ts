import { storeToRefs } from 'pinia'
import { emitTheme, fooMitt, onTheme } from '@tingcode/system'
import { useSettingStoreWithOut } from '@/store/modules/setting'

export const NAMESPACE = 'i18n'

export const useSetting = () => {
  const rootSettingStore = useSettingStoreWithOut()

  const setRootTheme = (value: string) => {
    emitTheme(value)
  }

  const { getRootTheme } = storeToRefs(rootSettingStore)

  return {
    getRootTheme,
    setRootTheme
  }
}

/** 同步主应用主题（与 micro-docs 一致） */
export const initSettingMitt = () => {
  const rootSettingStore = useSettingStoreWithOut()

  const setRootTheme = (value: string) => {
    rootSettingStore.setRootTheme(value)
  }

  onTheme(setRootTheme)

  return () => {
    fooMitt('theme', setRootTheme)
  }
}
