<template>
  <REButton :loading="true">
    <template #loading>loading</template>
  </REButton>
  <REButton type="confirm" @click="(evt) => console.log('确定', evt)" />
  <REButton type="cancel" @click="(e) => console.log('取消', e)" />
  <REButton type="search" @click="(e) => console.log('搜索', e)" />
</template>
<script setup lang="ts">
  import { REButton } from '@tingcli/lib-vue'
</script>
