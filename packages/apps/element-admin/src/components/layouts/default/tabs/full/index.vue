<template>
  <Icon icon="layout-full" size="20" @click="toggleIsOpenFull" />
</template>

<script setup lang="ts">
  import Icon from '@/components/Icon/Icon.vue'
  import { useRootSetting } from '@/hooks/useSetting/useRootSetting'
  const { toggleIsOpenFull } = useRootSetting()
  defineOptions({
    name: 'TabsFull'
  })
</script>
