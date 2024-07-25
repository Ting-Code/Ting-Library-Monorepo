import { getGlobalData, GlobalDataKeyEnum, setGlobalData } from './index'

export interface IEL {
  ElMessage: any
  ElMessageBox: any
}

export function setGlobalDataElement(El: IEL) {
  setGlobalData(GlobalDataKeyEnum.EL, El)
}

export function getGlobalDataElement(): IEL {
  const globalData = getGlobalData()
  return globalData?.[GlobalDataKeyEnum.EL]
}
