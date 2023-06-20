<template>
  <Icon icon="layout-setting" @click="toggleIsOpenSlider" />
</template>

<script setup lang="ts">
  defineOptions({
    name: 'HeaderTrigger'
  })
  import { Icon } from '@common/components'
  import { useRootSetting } from '@/hooks/useSetting/useRootSetting'
  const { toggleIsOpenSlider } = useRootSetting()
</script>
