<template>
  <component :is="getComponent(schema.type)" v-bind="schema.attrs || {}" ref="el">
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
  import { useSortable } from '@vueuse/integrations/useSortable'
  import { ComponentMap, RenderWidgetProps } from './index'
  import { filterSlots } from '../../hooks/useSchema'
  import type { ComponentPublicInstance } from 'vue'

  defineOptions({ name: 'RenderWidget' })
  const props = withDefaults(defineProps<RenderWidgetProps>(), {})
  const { model, schema } = toRefs(props)
  const slots = defineSlots()

  const getComponent = (type: string) => {
    return ComponentMap[type] || type
  }

  const el = ref<ComponentPublicInstance | null>(null)
  onMounted(() => {
    console.log('=========el==========', el.value?.$el)
  })
  useSortable(el.value?.$el, (schema.value.child || []) as any[], {
    onStart: (e) => {
      console.log('🚀 ~ e:', e)
    }
  })
</script>

<style lang="scss" scoped>
  @include b(render-widget) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
