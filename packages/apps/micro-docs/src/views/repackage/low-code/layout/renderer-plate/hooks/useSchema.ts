import { ref, Ref, toValue, computed } from 'vue'
import { ISchema } from '@/views/repackage/low-code/layout/renderer-plate/components/render-widget/index'
import set from 'lodash/set'
import get from 'lodash/get'
import { cloneDeep } from 'lodash'

export function traverseSchema<T extends ISchema>(schema: T, callback: (item: T) => void) {
  callback(schema)
  if (schema.child) {
    if (Array.isArray(schema.child)) {
      schema.child.forEach((child) => traverseSchema(child, callback))
    } else {
      traverseSchema(schema.child, callback)
    }
  }
}

export function initSchema<T extends ISchema, U extends Record<string, any>>(
  schema: T,
  model: Ref<U>
) {
  traverseSchema(schema, (schemaItem: T) => {
    if (schemaItem.type === 'ReForm') {
      if (!schemaItem.attrs) {
        schemaItem.attrs = {} as any
      }
      ;(schemaItem.attrs as any).model = model
    }
    if (schemaItem.field) {
      if (!schemaItem.attrs) {
        schemaItem.attrs = {} as any
      }
      ;(schemaItem.attrs as any).modelValue = computed(() =>
        get(toValue(model), schemaItem.field as string)
      )
      ;(schemaItem.attrs as any)['onUpdate:modelValue'] = (value: any) => {
        set(toValue(model), schemaItem.field as string, value)
      }
    }
  })
  return schema
}

export function useSchema<T extends ISchema, U extends Record<string, any>>(schema: T, model: U) {
  const schemaRef = ref<T>(schema) as Ref<T>
  const modelRef = ref<U>(model) as Ref<U>

  schemaRef.value = initSchema(cloneDeep(toValue(schemaRef)), modelRef)

  return { schema: schemaRef, model: modelRef }
}
