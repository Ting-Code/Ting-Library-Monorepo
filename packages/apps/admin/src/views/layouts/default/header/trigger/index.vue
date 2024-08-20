<template>
  <Icon
    :class="[ns.b(), { rotate: !isOpenSliderRef }]"
    size="28"
    icon="layout-slider"
    @click="toggleIsOpenSlider"
  />
</template>

<script setup lang="ts">
  import { Icon } from '@tingcode/lib-vue'
  import { useSetting } from '@/hooks/useSetting'
  import { useNamespace } from '@tingcode/system'
  defineOptions({
    name: 'HeaderTrigger'
  })
  const { toggleIsOpenSlider, isOpenSliderRef } = useSetting()
  const ns = useNamespace('header-trigger')
</script>

<style lang="scss">
  @include b(header-trigger) {
    &.rotate {
      transform: rotate(180deg);
    }
  }
</style>
