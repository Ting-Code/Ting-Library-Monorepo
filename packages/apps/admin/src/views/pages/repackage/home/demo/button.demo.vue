<template>
  <REButton @click="(e) => console.log('确定', e)"> 原生EP组件 </REButton>
  <REButton type="confirm" @click="(e) => console.log('确定', e)" />
  <REButton type="cancel" @click="(e) => console.log('取消', e)" />
  <REButton type="search" @click="(e) => console.log('搜索', e)" />
</template>
<script setup lang="ts">
  import { REButton } from '@tingcli/lib-vue'
</script>
