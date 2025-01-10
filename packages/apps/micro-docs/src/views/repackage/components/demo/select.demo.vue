<template>
  <div>options来传递对应选项参数</div>
  <ReSelect
    multiple
    :format="handleFormat"
    :value-format="handleValueFormat"
    @change="handleChange"
    v-model="data"
    :options="[
      { value: '1', label: '一' },
      { value: '2', label: '二' },
      { value: '3', label: '三', disabled: true }
    ]"
  >
    <template #label="{ label, value }">
      <span>{{ label }}: 666</span>
      <span style="font-weight: bold">{{ value }}</span>
    </template>
  </ReSelect>
  <el-select v-model="data">
    <el-option label="1" value="2" />
    <template #label="{ label, value }">
      <span>{{ label }}: 666</span>
      <span style="font-weight: bold">{{ value }}</span>
    </template>
  </el-select>
</template>
<script setup lang="ts">
  import { ReSelect } from '@tingcode/lib-vue'
  const data = ref('1')
  const handleChange = (value1, value2) => {
    console.log(value1, value2)
  }
  const handleFormat = (val) => {
    return val
  }
  const handleValueFormat = (val) => {
    return val
  }
</script>
