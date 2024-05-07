import { ComputedRef, InjectionKey, Ref } from 'vue'
import { createContext, useContext } from '@/hooks/useContext'
import { sizeEnum } from '@/views/application/useBreakpoint'

export interface AppProviderContextProps {
  namespace: Ref<string>
  screen: ComputedRef<sizeEnum | undefined>
  width: ComputedRef<number>
  realWidth: ComputedRef<number>
  isMobile: ComputedRef<boolean>
}

const key: InjectionKey<AppProviderContextProps> = Symbol()

export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key)
}

export function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key)
}
