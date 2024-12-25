<template>
  <ReButton @click="(e) => console.log('确定', e)"> 原生EP组件 </ReButton>
  <ReButton type="confirm" @click="(e) => console.log('确定', e)" />
  <ReButton type="cancel" @click="(e) => console.log('取消', e)" />
  <ReButton type="search" disabled @click="(e) => console.log('搜索', e)" />
  <ReButton type="default" size="small" @click="() => console.log('========')">小按钮</ReButton>
  <ReButton type="search" size="large" @click="() => console.log('========')">大按钮</ReButton>
  <el-input clearable v-model="data" @clear="() => console.log('=========清除========')">
    <template #prepend> 666 </template>
  </el-input>
  <ReInput
    size="large"
    @t="(s) => console.log('=========清除=maxlength=======')"
    clearable
    v-model="data"
    maxlength="2"
  >
    <template #append> 222 </template>
  </ReInput>
</template>
<script setup lang="ts">
  import { ReButton, ReInput } from '@tingcode/lib-vue'
  const data = ref('')
</script>

<style scoped lang="scss"></style>
