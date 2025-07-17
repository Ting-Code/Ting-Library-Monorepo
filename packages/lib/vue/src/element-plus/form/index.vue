<template>
  <ElForm v-bind="$attrs">
    <template v-for="(_, name) in slots" #[name]="native">
      <slot :name="name" v-bind="native || {}"></slot>
    </template>
  </ElForm>
</template>

<script setup lang="ts">
  import { ElForm } from 'element-plus'
  import { ReFormProps, ReFormSlots } from './index'

  defineOptions({
    name: 'ReForm',
    inheritAttrs: false
  })
  // 继承子组件props类型
  withDefaults(defineProps<ReFormProps>(), {})
  const slots = defineSlots<ReFormSlots>()
</script>
