<template>
  <Icon icon="layout-setting" @click="toggleIsOpenSetting" />
</template>

<script setup lang="ts">
  defineOptions({
    name: 'HeaderSetting'
  })
  import { Icon } from '@common/components'
  import { useRootSetting } from '@/hooks/useSetting/useRootSetting'
  const { toggleIsOpenSetting } = useRootSetting()
</script>
