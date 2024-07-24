import { getGlobalData, GlobalDataKeyEnum, setGlobalData } from './index'

export interface IENV {
  env: 'production' | 'development' | 'test'
  urlPrefix: string
  apiUrl: string
}

export function setGlobalDataEnv(env: IENV) {
  setGlobalData(GlobalDataKeyEnum.ENV, env)
}

export function getGlobalDataEnv(): IENV | undefined {
  const globalData = getGlobalData()
  return globalData?.[GlobalDataKeyEnum.ENV]
}
