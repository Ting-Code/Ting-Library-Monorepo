<template>
  <micro-app :name="name" :url="url" :default-page="path" :iframe="isIframe" />
</template>

<script setup lang="ts">
  import { useMicro } from '@tingcode/system'
  // import { useRedo } from '@/hooks/usePage'
  const { url, name, path, isIframe } = useMicro()
  // useRedo()
  console.log('=================重新渲染', url, name, path, isIframe)
</script>

<style lang="scss">
  micro-app,
  micro-app-body {
    height: 100%;
    > div {
      height: 100%;
    }
  }
</style>
