<template>
  <component :is="getComponent(schema.type)" v-bind="schema.attrs || {}">
    <template
      v-for="item in getChild(schema.child) || []"
      :key="item.type + JSON.stringify(item.attrs)"
    >
      <RenderWidget :schema="item" :model="model">
        <template v-for="(_, name) in slots" #[name]="native">
          <slot :name="name" v-bind="native || {}"></slot>
        </template>
      </RenderWidget>
    </template>
    <template v-for="{ name, native } in filterSlots(slots, schema.slotName)" #[native]="scope">
      <slot :name="name" v-bind="scope || {}"></slot>
    </template>
  </component>
</template>

<script setup lang="ts">
  defineOptions({ name: 'RenderWidget' })
  import { ComponentMap, ISlotName, RenderWidgetProps } from './index'
  import { isString, isArray, isObject } from '@tingcode/utils'

  const props = withDefaults(defineProps<RenderWidgetProps>(), {})
  const { model, schema } = toRefs(props)

  const slots = defineSlots()

  const hasSlot = (slotName: string | ISlotName[] | ISlotName | undefined, name: string) => {
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

  const getSlotName = (slotName: string | ISlotName[] | ISlotName | undefined, name: string) => {
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

  const filterSlots = (
    slots: Record<string, any>,
    slotName: string | ISlotName[] | ISlotName | undefined
  ) => {
    return Object.entries(slots)
      .filter(([name]) => hasSlot(slotName, name))
      .map(([name]) => {
        return { name, native: getSlotName(slotName, name) }
      })
  }

  const getComponent = (type: string) => {
    return ComponentMap[type] || type
  }

  const getChild = (child: undefined | unknown[] | unknown) => {
    if (!child) return []
    if (isArray(child)) return child
    if (isObject(child)) return [child]
  }
</script>

<style lang="scss" scoped>
  @include b(render-widget) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
