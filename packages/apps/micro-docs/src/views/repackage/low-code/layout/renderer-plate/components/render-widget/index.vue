<template>
  <component :is="getComponent(schema.type)" v-bind="schema.attrs || {}">
    <template v-for="item in schema.child || []" :key="item.type + JSON.stringify(item.attrs)">
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
  import { ComponentMap, RenderWidgetProps } from './index'
  import { filterSlots } from '../../hooks/useSchema'
  const props = withDefaults(defineProps<RenderWidgetProps>(), {})
  const { model, schema } = toRefs(props)

  const slots = defineSlots()

  const getComponent = (type: string) => {
    return ComponentMap[type] || type
  }
</script>

<style lang="scss" scoped>
  @include b(render-widget) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
