<template>
  <div>options来传递对应选项参数，并且支持原有组件插件传递</div>
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
  const handleChange = (...val1) => {
    console.log(val1)
  }
</script>
