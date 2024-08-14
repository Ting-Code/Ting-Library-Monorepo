import { ObjectDirective, App } from 'vue'
import { isArray, isObject, isString } from '@tingcode/utils'
import { hasAuth } from '@tingcode/system'

const accessesVerified = (value: string | string[] | unknown) => {
  if (isString(value)) {
    return [value]
  }
  if (isArray(value)) {
    return value
  }
  throw new Error(`[v-auth]: ${value} auth 不是字符串或数组!`)
}

export interface IAuthObject {
  disabled?: boolean
  auth?: string | string[]
}

export const auth: ObjectDirective<HTMLButtonElement, IAuthObject> = {
  mounted(el, binding) {
    const value = binding.value
    let disabled = false
    let accesses: string[] = []
    if (isObject(value)) {
      disabled = !!value.disabled
      accesses = accessesVerified(value?.auth)
    } else {
      accesses = accessesVerified(value)
    }
    if (!hasAuth(accesses)) {
      if (disabled) {
        el.disabled = true
        el.style['disabled'] = 'disabled'
      } else {
        // 异步销毁会出现闪屏现象 display: none会先隐藏避免闪屏
        el.style['display'] = 'none'
        // 由于某些组件用到了css v-bind 如果挂载的时候销毁Dom就会报错 所以需要异步销毁
        setTimeout(() => {
          el.parentNode?.removeChild(el)
        }, 0)
      }
    }
  }
}

export function setupAuthDirective(app: App) {
  app.directive('auth', auth)
}
