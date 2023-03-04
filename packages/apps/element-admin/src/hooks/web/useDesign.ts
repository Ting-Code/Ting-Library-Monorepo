import { useAppProviderContext } from '@/components/application/useAppContext'
export function useDesign(scope: string) {
  const values = useAppProviderContext()
  return {
    namespaceCls: `${values.namespace}-${scope}`,
    namespace: values.namespace
  }
}
