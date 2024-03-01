import { Slots } from 'vue'
import { isFunction } from '@tingcli/utils'

/**
 * @description:  获取插槽内容
 */
export function getSlot(
  slots: Slots,
  slot = 'default',
  data?: any,
  opts?: {
    disabled: boolean
    [key: string]: any
  }
) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`)
    return null
  }
  const slotFn = slots[slot]
  if (!slotFn) return null
  const params = { ...data, ...opts }
  return slotFn(params)
}

/**
 * @description 拓展插槽
 * @param slots
 * @param excludeKeys
 */
export function extendSlots(slots: Slots, excludeKeys: string[] = []) {
  const slotKeys = Object.keys(slots)
  const ret: any = {}
  slotKeys.forEach((key) => {
    if (!excludeKeys.includes(key)) {
      ret[key] = (data?: any) => getSlot(slots, key, data)
    }
  })
  return ret
}
