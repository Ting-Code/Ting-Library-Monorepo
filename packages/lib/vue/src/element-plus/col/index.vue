<template>
  <ElCol v-bind="$attrs">
    <template v-for="(_, name) in slots" #[name]="native">
      <slot :name="name" v-bind="native || {}"></slot>
    </template>
  </ElCol>
</template>

<script setup lang="ts">
  import { ElCol } from 'element-plus'
  import { ReColProps, ReColSlots } from './index'

  defineOptions({
    name: 'ReCol',
    inheritAttrs: false
  })
  // 继承子组件props类型
  withDefaults(defineProps<ReColProps>(), {})
  const slots = defineSlots<ReColSlots>()
</script>
