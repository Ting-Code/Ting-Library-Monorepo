<template>
  <div>options来传递对应选项参数，支持format来更改映射值</div>
  <ReSelect
    multiple
    format="stringSplitArray"
    value-format="arrayJoinString"
    @change="handleChange"
    v-model="data"
    :options="[
      { value: '1', label: '一' },
      { value: '2', label: '二' },
      { value: '3', label: '三', disabled: true }
    ]"
  >
    <template #label="{ label, value }">
      <span>{{ label }}：</span>
      <span style="font-weight: bold">{{ value }}</span>
    </template>
  </ReSelect>
</template>
<script setup lang="ts">
  import { ReSelect } from '@tingcode/lib-vue'
  const data = ref('1')
  const handleChange = (value1, value2) => {
    console.log(value1, value2)
  }
</script>
