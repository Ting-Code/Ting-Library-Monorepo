<template>
  <ElButton v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </ElButton>
  <ReButton type="default" size="default" />
</template>

<script setup lang="ts">
  import { ElButton } from 'element-plus'
  import ReButton from '../button'

  defineOptions({
    name: 'REDemo',
    inheritAttrs: false
  })
</script>
