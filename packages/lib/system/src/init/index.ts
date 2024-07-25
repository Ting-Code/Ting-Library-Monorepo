import microApp from '@micro-zoe/micro-app'
import { error } from '@tingcode/utils'

export function checkWindow() {
  if (!window) return error('System windows not found')
}

export function initMicroApp() {
  microApp.start()
}

export function initNamespace(namespace: string) {
  checkWindow()
  window.namespace = namespace
}
