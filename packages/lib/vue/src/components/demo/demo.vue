<template>
  <ElButton type="primary"> {{ props.title + props.name || '' }}</ElButton>
</template>

<script setup lang="ts">
  import { ElButton } from 'element-plus'
  defineOptions({
    name: 'Demo'
  })
  const props = defineProps<{
    title: string
    name?: string
  }>()
</script>
