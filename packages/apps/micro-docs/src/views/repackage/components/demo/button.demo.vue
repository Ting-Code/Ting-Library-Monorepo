<template>
  <ReButton @click="(e) => console.log('确定', e)"> 原生EP组件 </ReButton>
  <ReButton type="confirm" @click="(e) => console.log('确定', e)" />
  <ReButton type="cancel" @click="(e) => console.log('取消', e)" />
  <ReButton type="search" ting="ting" disabled @click="(e) => console.log('搜索', e)" />
  <ReButton size="small" type="default" @click="() => console.log('========')" />
  <el-button size="default" :disabled="true" type="success">
    <template #default></template>
  </el-button>
</template>
<script setup lang="ts">
  import { ReButton } from '@tingcode/lib-vue'
</script>

<style scoped lang="scss"></style>
