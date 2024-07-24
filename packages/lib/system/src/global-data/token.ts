import { getGlobalStorage, GlobalStorageKeyEnum, setGlobalStorage } from './index'

export function setGlobalStorageToken(token: string) {
  setGlobalStorage(GlobalStorageKeyEnum.TOKEN, token)
}

export function getGlobalStorageToken<T>(def?: T): string | T {
  return getGlobalStorage<string, T>(GlobalStorageKeyEnum.TOKEN, def)
}
