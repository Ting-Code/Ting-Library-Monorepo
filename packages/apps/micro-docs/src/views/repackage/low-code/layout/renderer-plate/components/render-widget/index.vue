<template>
  <template v-if="props.field.wrapper">
    <component :is="getComponent(props.field.wrapper)">
      <component :is="getComponent(props.field.type)" v-bind="props.field.attrs || {}">
        <template
          v-for="item in props.field.child || []"
          :key="item.type + JSON.stringify(item.attrs)"
        >
          <RenderWidget :field="item">
            <template v-for="(_, name) in slots" #[name]="native">
              <slot :name="name" v-bind="native || {}"></slot>
            </template>
          </RenderWidget>
        </template>
        <template
          v-for="{ name, native } in filterSlots(slots, props.field.slotName)"
          #[native]="scope"
        >
          <slot :name="name" v-bind="scope || {}"></slot>
        </template>
      </component>
      <template
        v-for="{ name, native } in filterSlots(slots, props.field.wrapperSlotName)"
        #[native]="scope"
      >
        <slot :name="name" v-bind="scope || {}"></slot>
      </template>
    </component>
  </template>
  <template v-else>
    <component :is="getComponent(props.field.type)" v-bind="props.field.attrs || {}">
      <template
        v-for="item in props.field.child || []"
        :key="item.type + JSON.stringify(item.attrs)"
      >
        <RenderWidget :field="item">
          <template v-for="(_, name) in slots" #[name]="native">
            <slot :name="name" v-bind="native || {}"></slot>
          </template>
        </RenderWidget>
      </template>
      <template
        v-for="{ name, native } in filterSlots(slots, props.field.slotName)"
        #[native]="scope"
      >
        <slot :name="name" v-bind="scope || {}"></slot>
      </template>
    </component>
  </template>
</template>

<script setup lang="ts">
  defineOptions({ name: 'RenderWidget' })
  import { componentMap, ISlotName, RenderWidgetProps } from './index'
  import { isString, isArray, isObject } from '@tingcode/utils'

  const props = withDefaults(defineProps<RenderWidgetProps>(), {})

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

  filterSlots(slots, props.field.slotName)

  const getComponent = (type: string) => {
    return componentMap[type] || type
  }
</script>

<style lang="scss" scoped>
  @include b(render-widget) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
