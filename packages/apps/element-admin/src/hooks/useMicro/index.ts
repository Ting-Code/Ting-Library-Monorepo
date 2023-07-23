import { isProdMode } from '@/utils/env'

export interface IUseMicroConfig {
  name?: string
}

export const useMicro = (config: IUseMicroConfig) => {
  const { name = 'rspack' } = config

  const microUrl = isProdMode() ? `http://139.199.173.241/${name}/` : 'http://localhost:8080/'

  return {
    microUrl,
    microName: name
  }
}
