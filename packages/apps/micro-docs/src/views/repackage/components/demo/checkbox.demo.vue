<template>
  <div>options来传递对应选项参数，支持format来更改映射值</div>
  <ReCheckboxGroup
    v-model="data"
    :options="[
      { value: '1', label: '一' },
      { value: '2', label: '二' },
      { value: '3', label: '三', disabled: true }
    ]"
  >
    <template #default="{ label }">
      <div>label：{{ label }}</div>
    </template>
  </ReCheckboxGroup>
</template>
<script setup lang="ts">
  import { ReCheckboxGroup } from '@tingcode/lib-vue'
  const data = ref([])
</script>
