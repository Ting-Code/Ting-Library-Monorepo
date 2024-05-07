<template>
  <Icon icon="layout-setting" size="20" @click="toggleIsOpenSetting" />
</template>

<script setup lang="ts">
  import { useRootSetting } from '@/hooks/useSetting/useRootSetting'
  const { toggleIsOpenSetting } = useRootSetting()

  defineOptions({
    name: 'HeaderSetting'
  })
</script>
