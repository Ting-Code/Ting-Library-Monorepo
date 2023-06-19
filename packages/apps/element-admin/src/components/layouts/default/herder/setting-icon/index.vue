<template>
  <Icon icon="common-setting" @click="toggleIsOpenSetting" />
</template>

<script setup lang="ts">
  import { Icon } from '@common/components'
  import { useRootSetting } from '@/hooks/useSetting/useRootSetting'
  const { toggleIsOpenSetting } = useRootSetting()
</script>
