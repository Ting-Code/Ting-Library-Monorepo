<template>
  <ElButton type="primary"> {{ props.title + props.name || '' }}</ElButton>
  <ElDrawer title="asd" />
</template>

<script setup lang="ts">
  import { ElButton, ElDrawer } from 'element-plus'

  defineOptions({
    name: 'Demo'
  })
  const props = withDefaults(
    defineProps<{
      title: string
      name?: string
    }>(),
    {}
  )
</script>
