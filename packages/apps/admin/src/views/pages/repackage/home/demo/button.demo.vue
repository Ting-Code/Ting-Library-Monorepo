<template>
  <ReButton @click="(e) => console.log('确定', e)"> 原生EP组件 </ReButton>
  <ReButton type="confirm" @click="(e) => console.log('确定', e)" />
  <ReButton type="cancel" @click="(e) => console.log('取消', e)" />
  <ReButton type="search" @click="(e) => console.log('搜索', e)" />
</template>
<script setup lang="ts">
  import { ReButton } from '@tingcli/lib-vue'
</script>
