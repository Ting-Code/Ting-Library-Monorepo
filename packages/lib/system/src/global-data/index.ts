import microApp from '@micro-zoe/micro-app'
import { createStorage } from '@tingcode/utils'

export enum GlobalStorageKeyEnum {
  KEY = 'GLOBAL_STORAGE',
  TOKEN = 'TOKEN'
}

const GlobalStorage = createStorage({ prefixKey: GlobalStorageKeyEnum.KEY })
export function getGlobalStorage<U, T>(key: GlobalStorageKeyEnum, def?: T): U | T {
  return GlobalStorage.get(key, def)
}
export function setGlobalStorage(key: GlobalStorageKeyEnum, value: unknown) {
  GlobalStorage.set(key, value)
}

export function removeGlobalStorage(key: GlobalStorageKeyEnum) {
  GlobalStorage.remove(key)
}

export enum GlobalDataKeyEnum {
  ENV = 'ENV',
  EL = 'EL',
  USER_INFO = 'USER_INFO',
  AUTH = 'AUTH',
  MENU = 'MENU',
  MITT = 'MITT'
}

export function getMicroAppFn() {
  const namespace = window?.namespace
  return namespace === 'admin' ? microApp : window.microApp
}

export function getMainWindow(): Window {
  const namespace = window?.namespace
  return namespace === 'admin' ? window : window.rawWindow
}

export function getGlobalData() {
  const microAppFn = getMicroAppFn()
  return microAppFn?.getGlobalData() // 子应用返回全局数据
}

export function setGlobalData(key: GlobalDataKeyEnum, value: unknown) {
  const microAppFn = getMicroAppFn()
  microAppFn?.setGlobalData({ [key]: value })
}

export function addGlobalDataListener(fn: () => any) {
  const microAppFn = getMicroAppFn()
  microAppFn.addGlobalDataListener(fn)
}

export * from './env'
export * from './user'
export * from './element'
export * from './mitt'
