<template>
  <Icon icon="common-setting" @click="toggleIsOpenSetting" />
</template>

<script setup lang="ts">
  import { Icon } from '@common/components'
  import { useRootSetting } from '@/hooks/use-setting/useRootSetting'
  const { toggleIsOpenSetting } = useRootSetting()
</script>
