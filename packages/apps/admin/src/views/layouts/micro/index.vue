<template>
  <micro-app :name="name" :url="url" default-page="microAppDemo" />
</template>

<script setup lang="ts">
  import { useMicro } from '@tingcode/system'
  const { url, name } = useMicro()
</script>
