import { isProdMode } from '@/hooks/useEnv'

export interface IUseMicroConfig {
  name?: string
}

export const useMicro = (config: IUseMicroConfig) => {
  const { name = 'micro' } = config

  const microUrl = isProdMode() ? `http://139.199.173.241/${name}/` : 'http://localhost:8080/'

  return {
    microUrl,
    microName: name
  }
}
