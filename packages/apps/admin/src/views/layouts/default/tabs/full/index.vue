<template>
  <Icon icon="layout-full" size="20" @click="toggleIsOpenFull" />
</template>

<script setup lang="ts">
  import { Icon } from '@tingcode/lib-vue'
  import { useSetting } from '@/hooks/useSetting'
  const { toggleIsOpenFull } = useSetting()
  defineOptions({
    name: 'TabsFull'
  })
</script>
