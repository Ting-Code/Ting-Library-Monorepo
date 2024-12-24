<template>
  <ElInput v-bind="$attrs">
    <template v-for="(_, name) in slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </ElInput>
</template>

<script setup lang="ts">
  import { ElInput } from 'element-plus'
  import { ReInputProps, ReInputSlots, ReInputEmits } from './index'

  defineOptions({
    name: 'ReInput',
    inheritAttrs: false
  })

  // 继承子组件props类型
  withDefaults(defineProps<ReInputProps>(), {})

  const slots = defineSlots<ReInputSlots>()

  defineEmits<ReInputEmits>()
</script>
