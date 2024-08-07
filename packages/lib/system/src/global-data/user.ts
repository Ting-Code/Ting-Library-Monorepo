import {
  getGlobalStorage,
  GlobalStorageKeyEnum,
  setGlobalStorage,
  removeGlobalStorage,
  setGlobalData,
  getGlobalData,
  GlobalDataKeyEnum
} from './index'
import { IMenu } from '../api/apiSystem'

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

export function setGlobalDataUserInfo(info: IUserInfo) {
  setGlobalData(GlobalDataKeyEnum.USER_INFO, info)
}

export function getGlobalDataUserInfo(): IUserInfo | undefined {
  const globalData = getGlobalData()
  return globalData?.[GlobalDataKeyEnum.USER_INFO]
}

export function setGlobalDataAuth(auth: IMenu[]) {
  setGlobalData(GlobalDataKeyEnum.AUTH, auth)
}

export function getGlobalDataAuth(): IMenu[] | undefined {
  const globalData = getGlobalData()
  return globalData?.[GlobalDataKeyEnum.AUTH]
}

export function setGlobalDataMenu(menu: Omit<IMenu, 'children'>[]) {
  setGlobalData(GlobalDataKeyEnum.MENU, menu)
}

export function getGlobalDataMenu(): Omit<IMenu, 'children'>[] | undefined {
  const globalData = getGlobalData()
  return globalData?.[GlobalDataKeyEnum.MENU]
}
