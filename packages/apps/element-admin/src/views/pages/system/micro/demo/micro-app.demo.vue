<template>
  <div>5版本</div>
  <micro-app :name="microName" :url="microUrl" default-page="microAppDemo" />
</template>

<script setup lang="ts">
  import { useMicro } from '@/hooks/useMicro'

  const { microUrl, microName } = useMicro({
    name: 'rspack'
  })
</script>
