import { getGlobalData, GlobalDataKeyEnum, setGlobalData } from './index'
import { Emitter, EventType } from 'mitt'
import { CreateCallbackParams, IRouterInfo } from '../hooks'
import { error } from '@tingcode/utils'

export interface IMittEvents {
  [eventName: EventType]: unknown
  browserScreen: CreateCallbackParams
  router: IRouterInfo
  theme: string
  isOpenSetting: boolean
  isOpenSlider: boolean
  isOpenFull: boolean
}

export function setGlobalDataMitt<T extends IMittEvents>(mitt: Emitter<T | IMittEvents>) {
  setGlobalData(GlobalDataKeyEnum.MITT, mitt)
}

export function getGlobalDataMitt<T extends IMittEvents>(): Emitter<T | IMittEvents> | undefined {
  const globalData = getGlobalData()
  return globalData?.[GlobalDataKeyEnum.MITT]
}

export function emitMitt<Key extends keyof IMittEvents>(key: Key, value: IMittEvents[Key]) {
  const mitt = getGlobalDataMitt()
  if (!mitt) return error('Mitt is not init')
  mitt.emit(key, value)
}

export function onMitt<Key extends keyof IMittEvents>(
  key: Key,
  fn: (opt: IMittEvents[Key]) => void
) {
  const mitt = getGlobalDataMitt()
  if (!mitt) return error('Mitt is not init')
  mitt.on(key, fn)
}

export function fooMitt<Key extends keyof IMittEvents>(
  key: Key,
  fn: (opt: IMittEvents[Key]) => void
) {
  const mitt = getGlobalDataMitt()
  if (!mitt) return error('Mitt is not init')
  mitt.off(key, fn)
}
