import { ref, Ref, toValue, toRef, watch } from 'vue'
import { isArray, isObject, set, get, cloneDeep } from '@tingcode/utils'
import { ISchema } from '@/views/repackage/low-code/layout/renderer-plate/components/render-widget/index'

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

/**
 * @description bind model & bing updateModel
 * @param schemaItem
 * @param model
 */
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

/**
 * @description hide to remove
 * @param schema
 * @param schemaItem
 */
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

/**
 * @description generate renderSchema
 * @param schema
 * @param model
 */
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
