<template>
  <Icon
    :class="[ns.b(), { rotate: !isOpenSliderRef }]"
    size="28"
    icon="layout-slider"
    @click="toggleIsOpenSlider"
  />
</template>

<script setup lang="ts">
  import Icon from '@/components/Icon/Icon.vue'
  import { useRootSetting } from '@/hooks/useSetting/useRootSetting'
  import { useNamespace } from '@/hooks/useNamespace'
  defineOptions({
    name: 'HeaderTrigger'
  })
  const { toggleIsOpenSlider, isOpenSliderRef } = useRootSetting()
  const ns = useNamespace('header-trigger')
</script>

<style lang="scss">
  @include b(header-trigger) {
    &.rotate {
      transform: rotate(180deg);
    }
  }
</style>
