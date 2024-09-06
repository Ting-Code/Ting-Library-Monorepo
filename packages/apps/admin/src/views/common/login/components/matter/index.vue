<template>
  <div :class="ns.b()" ref="matterRef"></div>
</template>

<script lang="ts" setup>
  import { useNamespace } from '@tingcode/system'
  import { initMatter } from './hooks/matter'
  const ns = useNamespace('matter')

  const matterRef = ref()
  onMounted(() => {
    initMatter(matterRef.value)
  })
</script>

<style lang="scss" scoped>
  @include b(matter) {
    width: 100%;
    height: 100%;
    overflow: hidden;

    @include e(left) {
      display: flex;
    }
  }
</style>
