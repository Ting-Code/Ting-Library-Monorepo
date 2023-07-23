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

  const microUrl = isProdMode() ? `http://139.199.173.241/${name}/` : 'http://localhost:8080/'

  onMounted(() => {
    nextTick(() => {
      const { ...query } = route.query
      router.replace({ query: { ...query, [name]: defaultUrl } })
    })
  })
  return {
    microUrl,
    microName: name,
    replaceDefaultUrl: defaultUrl
  }
}
