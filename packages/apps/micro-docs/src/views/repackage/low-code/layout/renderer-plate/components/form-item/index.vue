<template>
  <ElFormItem v-bind="$attrs">
    <template v-for="(_, name) in slots" #[name]="native">
      <slot :name="name" v-bind="native || {}"></slot>
    </template>
  </ElFormItem>
</template>

<script setup lang="ts">
  import { ElFormItem } from 'element-plus'
  import { ReFormItemProps, ReFormItemSlots } from './index'

  defineOptions({
    name: 'ReForm',
    inheritAttrs: false
  })
  // 继承子组件props类型
  withDefaults(defineProps<ReFormItemProps>(), {})
  const slots = defineSlots<ReFormItemSlots>()
</script>
