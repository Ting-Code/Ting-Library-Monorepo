<template>
  <div>利用valueFormat处理绑定值，keepNumbers只允许数字</div>
  <ReRadio
    @change="handleChange"
    v-model="data"
    :options="[
      { value: '1', label: '一' },
      { value: '2', label: '二' },
      { value: '3', label: '三' }
    ]"
  >
    <template #default="{ label }">
      <span style="padding: 12px">
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
