import { ObjectDirective, App } from 'vue'
import { usePermission } from '@/hooks/usePermission'
import { isArray, isObject, isString } from '@tingcode/utils'

const accessesVerified = (value) => {
  if (isString(value)) {
    return [value]
  }
  if (isArray(value)) {
    return value
  }
  throw new Error(`[v-auth]: ${value} auth 不是字符串或数组!`)
}

export const permission: ObjectDirective = {
  mounted(el: HTMLButtonElement, binding) {
    if (binding.value == undefined) return
    const value = binding.value
    let disabled = null
    let accesses: string[] = []
    if (isObject(value)) {
      // @ts-ignore
      disabled = value.disabled
      // @ts-ignore
      accesses = accessesVerified(value.auth)
    } else {
      accesses = accessesVerified(value)
    }
    const { hasPermission } = usePermission()
    if (!hasPermission(accesses)) {
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

export function setupPermissionDirective(app: App) {
  app.directive('auth', permission)
}
