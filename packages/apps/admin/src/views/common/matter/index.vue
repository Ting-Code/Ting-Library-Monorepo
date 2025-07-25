<template>
  <div :class="ns.b()" ref="matterRef"></div>
</template>

<script lang="ts" setup>
  import { useNamespace } from '@tingcode/system'
  import { useMatter } from './hooks/matter'
  const ns = useNamespace('matter')
  const matterRef = ref()
  let clearMatter = () => {
    console.log('先执行createMatter， 再执行createMatter')
  }

  const { createMatter } = useMatter()

  onMounted(() => {
    clearMatter = createMatter(matterRef.value)
  })
  onBeforeUnmount(() => {
    clearMatter()
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
