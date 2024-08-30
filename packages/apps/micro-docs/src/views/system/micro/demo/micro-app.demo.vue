<template>
  <micro-app-docs :name="name" :url="url" default-page="microAppDemo" iframe />
</template>

<script setup lang="ts">
  import { useMicro } from '@tingcode/system'
  const { name, url } = useMicro('react')
</script>
