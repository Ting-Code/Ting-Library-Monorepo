import { InjectionKey, Ref } from 'vue'
import { createContext, index } from '@/hooks/use-context'

export interface AppProviderContextProps {
  namespace: Ref<string>
  isMobile: Ref<boolean>
}

const key: InjectionKey<AppProviderContextProps> = Symbol()

export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key)
}

export function useAppProviderContext() {
  return index<AppProviderContextProps>(key)
}
