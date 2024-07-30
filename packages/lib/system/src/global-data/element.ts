import { getGlobalData, GlobalDataKeyEnum, setGlobalData } from './index'

export interface IEL {
  ElMessage: any
  ElMessageBox: any
}

export function setGlobalDataElement<T = IEL>(El: T) {
  setGlobalData(GlobalDataKeyEnum.EL, El)
}

export function getGlobalDataElement<T = IEL>(): T {
  const globalData = getGlobalData()
  return globalData?.[GlobalDataKeyEnum.EL]
}
