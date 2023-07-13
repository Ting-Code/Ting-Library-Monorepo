<template>
  <Md />
  222222222222
  {{ props.id }}
</template>

<script setup lang="ts">
  const props = defineProps<{
    id?: string
  }>()
  import Md from './index.md'
</script>
