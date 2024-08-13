import mitt from 'mitt'
import microApp from '@micro-zoe/micro-app'
import { error } from '@tingcode/utils'
import { createAxios, BasicResponseModel } from './api'
import { IMittEvents, setGlobalDataMitt } from '../global-data/mitt'
export function checkWindow() {
  if (!window) return error('System windows not found')
}

/**
 * @description 初始化微前端
 */
export function initMicroApp() {
  microApp.start()
}

/**
 * @description 初始化命名空间
 * @param namespace
 */
export function initNamespace(namespace: string) {
  checkWindow()
  window.namespace = namespace
}

let request = createAxios()

/**
 * @description 初始化请求工具
 */
export function initRequest() {
  return (request = createAxios())
}

export function initMitt() {
  const emitter = mitt<IMittEvents>()
  setGlobalDataMitt(emitter)
}

export { request }
export type { BasicResponseModel }
