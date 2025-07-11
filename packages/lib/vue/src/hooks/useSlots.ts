import { Slots } from 'vue'
import { isFunction } from '@tingcode/utils'
import { isArray, isString, isObject } from '@tingcode/utils'
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

export type ISlotName = string | { native?: string; name: string }

export function hasSlot(slotName: string | ISlotName[] | ISlotName | undefined, name: string) {
  if (!slotName || !name) return false
  if (isString(slotName)) {
    return slotName === name
  }
  if (isArray(slotName)) {
    return slotName.some((i) => {
      return hasSlot(i, name)
    })
  }
  if (isObject(slotName)) {
    return slotName.name === name
  }
  return false
}

export function getSlotName(slotName: string | ISlotName[] | ISlotName | undefined, name: string) {
  if (!hasSlot(slotName, name)) return name
  if (isString(slotName)) {
    return slotName
  }
  if (isArray(slotName)) {
    const slotNameItem = slotName.find((i) => {
      return hasSlot(i, name)
    })
    if (slotNameItem) return getSlotName(slotNameItem, name)
    return name
  }
  if (isObject(slotName)) {
    return slotName?.native || name
  }
}

export function filterSlots(
  slots: Record<string, any>,
  slotName: string | ISlotName[] | ISlotName | undefined
) {
  return Object.entries(slots)
    .filter(([name]) => hasSlot(slotName, name))
    .map(([name]) => {
      return { name, native: getSlotName(slotName, name) }
    })
}
