<template>
  <div :class="ns.b()">
    <div :class="ns.e('left')">
      <ComponentPlate />
    </div>
    <div :class="ns.e('main')">
      <RendererPlate v-model:isShowStencil="isShowStencil" :isMobile="isMobile" />
    </div>
    <div :class="ns.e('right')">右边</div>
  </div>
</template>

<script setup lang="ts">
  import { useNamespace } from '@tingcode/system'
  import { useAppProviderContext } from '@/application/useAppContext'
  import ComponentPlate from './layout/component-plate/index.vue'
  import RendererPlate from '@/views/repackage/low-code/layout/renderer-plate/index.vue'
  const { isMobile } = toRefs(useAppProviderContext())
  defineOptions({ name: 'LowCode' })
  const isShowStencil = ref(true)
  const ns = useNamespace('low-code')
  watch(
    isMobile,
    (val) => {
      if (val) {
        isShowStencil.value = false
      } else {
        isShowStencil.value = true
      }
    },
    { immediate: true }
  )
</script>

<style lang="scss" scoped>
  @include b(low-code) {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;

    @include e(main) {
      height: 100%;
      overflow: hidden;
      flex: 1;
    }
    @include e(left) {
      width: 200px;
      height: 100%;
      overflow: hidden;
    }
    @include e(right) {
      width: 200px;
      height: 100%;
      overflow: hidden;
    }
  }
</style>
