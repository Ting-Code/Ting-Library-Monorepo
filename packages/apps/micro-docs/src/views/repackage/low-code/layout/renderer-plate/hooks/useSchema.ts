import { ref, Ref, toValue, toRef, watch } from 'vue'
import { isArray, isString, isObject } from '@tingcode/utils'
import { ISchema } from '@/views/repackage/low-code/layout/renderer-plate/components/render-widget/index'
import set from 'lodash/set'
import get from 'lodash/get'
import { cloneDeep } from 'lodash'

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

export function recursionSchema<T extends ISchema>(schema: T, callback: (item: T) => void) {
  callback(schema)
  if (schema.child) {
    if (isArray(schema.child)) {
      schema.child.forEach((child) => recursionSchema(child, callback))
    } else {
      recursionSchema(schema.child, callback)
    }
  }
}
export function getParent<T extends ISchema>(root: T, target: T): T | null {
  if (root.child === target) return root
  if (isArray(root.child)) {
    if (root.child.includes(target)) return root
    for (const child of root.child) {
      const result = getParent(child as T, target)
      if (result) return result
    }
  } else if (root.child) {
    return getParent(root.child as T, target)
  }
  return null
}
export function filterSchema<T extends ISchema>(schema: T, conditions: Partial<T>): T[] {
  const result: T[] = []
  recursionSchema(schema, (item: T) => {
    const match = Object.entries(conditions).every(([key, value]) => {
      return (item as any)[key] === value
    })
    if (match) {
      result.push(item)
    }
  })
  return result
}
export function findSchema<T extends ISchema>(schema: T, conditions: Partial<T>): T | null {
  let result: T | null = null
  recursionSchema(schema, (item: T) => {
    if (result) return
    const match = Object.entries(conditions).every(([key, value]) => {
      return (item as any)[key] === value
    })
    if (match) {
      result = item
    }
  })
  return result
}
export function conductChild<T extends ISchema>(schema: T) {
  if (!schema.child) return
  if (isArray(schema.child)) return
  if (isObject(schema.child)) {
    schema.child = [schema.child]
  }
}
export function conductFormModel<T extends ISchema, U extends Record<string, any>>(
  schemaItem: T,
  model: Ref<U>
) {
  if (schemaItem.type === 'ReForm') {
    if (!schemaItem.attrs) {
      schemaItem.attrs = {} as any
    }
    ;(schemaItem.attrs as any).model = toRef(() => toValue(model))
  }
  if (schemaItem.field) {
    if (!schemaItem.attrs) {
      schemaItem.attrs = {} as any
    }
    ;(schemaItem.attrs as any).modelValue = toRef(() =>
      get(toValue(model), schemaItem.field as string)
    )
    ;(schemaItem.attrs as any)['onUpdate:modelValue'] = (value: any) => {
      set(toValue(model), schemaItem.field as string, value)
    }
  }
}
export function conductHide<T extends ISchema>(schema: T, schemaItem: T) {
  if (schemaItem.hide) {
    const parent = getParent(schema, schemaItem)
    if (parent) {
      if (isArray(parent.child)) {
        parent.child = parent.child.filter((child) => child !== schemaItem)
      } else if (parent.child) {
        delete parent.child
      }
    }
  }
}
export function generateRenderSchema<T extends ISchema, U extends Record<string, any>>(
  schema: T,
  model: Ref<U>
) {
  recursionSchema(schema, (schemaItem: T) => {
    conductFormModel(schemaItem, model)
    conductHide(schema, schemaItem)
    conductChild(schemaItem)
  })

  return schema
}

export function useSchema<T extends ISchema, U extends Record<string, any>>(schema: T, model: U) {
  const originSchema = ref<T>(schema) as Ref<T>
  const originModel = ref<U>(model) as Ref<U>
  const renderSchema = ref<T>(schema) as Ref<T>

  watch(
    originSchema,
    () => {
      renderSchema.value = generateRenderSchema(cloneDeep(toValue(originSchema)), originModel)
    },
    { deep: true, immediate: true }
  )

  function switchHide(conditions: Partial<T>, hide: boolean | 'switch') {
    const target = findSchema(toValue(originSchema), conditions)
    if (target) {
      if (hide === 'switch') {
        target.hide = !target.hide
      } else {
        target.hide = hide
      }
    } else {
      console.error('[switchHide function error]: No matching schema item was found')
    }
    return originSchema
  }
  function switchAllHide(conditions: Partial<T>, hide: boolean | 'switch') {
    const targets = filterSchema(toValue(originSchema), conditions)
    if (targets && targets.length) {
      targets.forEach((target) => {
        if (hide === 'switch') {
          target.hide = !target.hide
        } else {
          target.hide = hide
        }
      })
    } else {
      console.error('[switchAllHide function error]: No matching schema item was found')
    }
    return originSchema
  }

  return {
    model: originModel,
    renderSchema: renderSchema,
    schema: originSchema,
    switchHide,
    switchAllHide
  }
}
