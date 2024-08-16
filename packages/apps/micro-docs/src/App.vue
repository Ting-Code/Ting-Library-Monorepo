<template>
  <AppProvider>
    <router-view />
  </AppProvider>
</template>

<script setup lang="ts">
  import { AppProvider } from '@/application'

  console.log('===============触发重新渲染', window.location)
</script>
