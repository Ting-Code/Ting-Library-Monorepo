<template>
  <ElRow v-bind="$attrs">
    <template v-for="(_, name) in slots" #[name]="native">
      <slot :name="name" v-bind="native || {}"></slot>
    </template>
  </ElRow>
</template>

<script setup lang="ts">
  import { ElRow } from 'element-plus'
  import { ReRowProps, ReRowSlots } from './index'

  defineOptions({
    name: 'ReRow',
    inheritAttrs: false
  })
  // 继承子组件props类型
  withDefaults(defineProps<ReRowProps>(), {})
  const slots = defineSlots<ReRowSlots>()
</script>
