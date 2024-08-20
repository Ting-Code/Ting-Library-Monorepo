<template>
  <micro-app :name="name" :url="url" :iframe="isIframe" router-mode="native" />
</template>

<script setup lang="ts">
  import { useMicro } from '@tingcode/system'
  const { url, name, isIframe } = useMicro()
  console.log('======= useMicro ======', url, name, isIframe)
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
