<template>
  <div @click.stop="toggleIsOpenSlider">
    <Icon icon="common-left" size="18" v-if="isOpenSlider" />
    <Icon icon="common-right" size="18" v-else />
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '@common/components'
  import { useRootSetting } from '@/hooks/use-setting/useRootSetting'
  const { isOpenSlider, toggleIsOpenSlider } = useRootSetting()
</script>
