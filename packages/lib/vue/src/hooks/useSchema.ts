import { ref, Ref, toValue, toRef } from 'vue'
import { isArray, isObject, set, get, cloneDeep } from '@tingcode/utils'
import { ISchema } from '@/element-plus/render-widget/index'

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
export function getSchemaParent<T extends ISchema>(root: T, target: T): T | null {
  if (root.child === target) return root
  if (isArray(root.child)) {
    if ((root.child as T[]).includes(target)) return root
    for (const child of root.child) {
      const result = getSchemaParent(child as T, target)
      if (result) return result
    }
  } else if (root.child) {
    return getSchemaParent(root.child as T, target)
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
export function conductSchemaChild<T extends ISchema>(schema: T) {
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
export function conductSchemaFormModel<T extends ISchema, U extends Record<string, any>>(
  schemaItem: T,
  model: U
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
export function conductSchemaHide<T extends ISchema>(schema: T, schemaItem: T) {
  if (schemaItem.hide) {
    const parent = getSchemaParent(schema, schemaItem)
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
export function generateSchema<T extends ISchema, U extends Record<string, any>>(
  schema: T,
  model: U
) {
  recursionSchema(schema, (schemaItem: T) => {
    conductSchemaFormModel(schemaItem, model)
    conductSchemaHide(schema, schemaItem)
    conductSchemaChild(schemaItem)
  })

  return schema
}

export function useSchema<T extends ISchema, U extends Record<string, any>>(
  schema?: T,
  model: U = {} as U
) {
  const originSchema = ref<T | undefined>(schema) as Ref<T | undefined>
  const originModel = ref<U>(model) as Ref<U>
  const renderSchema = ref<T | undefined>(schema) as Ref<T | undefined>

  function generateRenderSchema(schema = toValue(originSchema!)!, model = toValue(originModel)) {
    if (!schema || !model) return
    originSchema.value = schema
    originModel.value = model
    renderSchema.value = generateSchema(cloneDeep(schema), model)
  }
  if (schema) {
    generateRenderSchema()
  }
  function switchHide(conditions: Partial<T>, hide: boolean | 'switch') {
    const target = findSchema(toValue(originSchema!)!, conditions)
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
    const targets = filterSchema(toValue(originSchema!)!, conditions)
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
    generateRenderSchema,
    switchHide,
    switchAllHide
  }
}
