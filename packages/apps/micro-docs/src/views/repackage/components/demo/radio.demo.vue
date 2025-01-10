<template>
  <div>options来传递对应选项参数</div>
  <ReRadio
    @change="handleChange"
    v-model="data"
    :options="[
      { value: '1', label: '一' },
      { value: '2', label: '二' },
      { value: '3', label: '三', disabled: true }
    ]"
  >
    <template #default="{ label }">
      <span>
        {{ label }}
      </span>
    </template>
  </ReRadio>
</template>
<script setup lang="ts">
  import { ReRadio } from '@tingcode/lib-vue'
  const data = ref('1')
  const handleChange = (value1, value2) => {
    console.log(value1, value2)
  }
</script>
