<template>
  <ReButton @click="(e) => console.log('确定', e)"> 原生EP组件 </ReButton>
  <ReButton type="confirm" @click="(e) => console.log('确定', e)" />
  <!--  <el-input clearable v-model="data" @clear="() => console.log('=========清除========')">-->
  <!--    <template #prepend> 666 </template>-->
  <!--  </el-input>-->
  <ReInput
    valueFormat="keepNumbers"
    format="thousandsRound2D"
    size="large"
    clearable
    v-model="data"
  >
    <template #append> 222 </template>
  </ReInput>
  <!--  <ReInput size="small" clearable v-model="data" maxlength="2">-->
  <!--    <template #append> 222 </template>-->
  <!--  </ReInput>-->
</template>
<script setup lang="ts">
  import { ReButton, ReInput } from '@tingcode/lib-vue'
  const data = ref('123123123')
</script>

<style scoped lang="scss"></style>
