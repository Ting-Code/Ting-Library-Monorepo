import {
  getGlobalStorage,
  GlobalStorageKeyEnum,
  setGlobalStorage,
  removeGlobalStorage,
  setGlobalData,
  getGlobalData,
  GlobalDataKeyEnum
} from './index'

export interface IUserInfo {
  userName?: string
}

export function setGlobalStorageToken(token: string) {
  setGlobalStorage(GlobalStorageKeyEnum.TOKEN, token)
}

export function getGlobalStorageToken<T>(def?: T): string | T {
  return getGlobalStorage<string, T>(GlobalStorageKeyEnum.TOKEN, def)
}

export function removeGlobalStorageToken() {
  removeGlobalStorage(GlobalStorageKeyEnum.TOKEN)
}

export function setGlobalUserInfo(info: IUserInfo) {
  setGlobalData(GlobalDataKeyEnum.USER_INFO, info)
}

export function getGlobalDataUserInfo(): IUserInfo | undefined {
  const globalData = getGlobalData()
  return globalData?.[GlobalDataKeyEnum.USER_INFO]
}

export function setGlobalUserAuth(auth: any[]) {
  setGlobalData(GlobalDataKeyEnum.AUTH, auth)
}

export function getGlobalDataAuth(): any[] | undefined {
  const globalData = getGlobalData()
  return globalData?.[GlobalDataKeyEnum.AUTH]
}
