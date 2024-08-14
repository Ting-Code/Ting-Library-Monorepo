import { InjectionKey, Ref } from 'vue'
import { createContext, useContext } from '@/hooks/useContext'
import { screenSizeEnum } from '@tingcode/system'

export interface AppProviderContextProps {
  namespace: Ref<string>
  screen: Ref<screenSizeEnum | undefined>
  width: Ref<number>
  screenWidth: Ref<number>
  isMobile: Ref<boolean>
}

const key: InjectionKey<AppProviderContextProps> = Symbol()

export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key)
}

export function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key)
}
