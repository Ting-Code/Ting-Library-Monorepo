import { useRoute, useRouter } from 'vue-router'
import { isProdMode } from '@/utils/env'
import { nextTick, onMounted } from 'vue'

export interface IUseMicroConfig {
  name?: string
  defaultUrl?: string
}

export const useMicro = (config: IUseMicroConfig) => {
  const { name = 'rspack', defaultUrl = '/' } = config
  const router = useRouter()
  const route = useRoute()

  const microUrl = isProdMode() ? 'http://139.199.173.241/' : 'http://localhost:8080/'
  const replaceDefaultUrl = isProdMode() ? `/${name}${defaultUrl}` : defaultUrl

  onMounted(() => {
    nextTick(() => {
      const { ...query } = route.query
      router.replace({ query: { ...query, [name]: replaceDefaultUrl } })
    })
  })
  return {
    microUrl,
    microName: name,
    replaceDefaultUrl
  }
}
