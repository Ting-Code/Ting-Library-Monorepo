<template>
  <div>3版本</div>
  <micro-app :name="microName" :url="microUrl" />
</template>

<script setup lang="ts">
  import { useMicro } from '@/hooks/useMicro'

  const { microUrl, microName } = useMicro({
    name: 'rspack',
    defaultUrl: '%2Frspack%2FmicroAppDemo'
  })
</script>
