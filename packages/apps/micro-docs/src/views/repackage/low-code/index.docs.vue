<template>
  <div :class="ns.b()">
    <div :class="ns.e('head')">
      <template v-if="isMobile">
        <ReButton v-show="!isShowStencil" @click="isShowStencil = true" />
        <ReButton v-show="isShowStencil" @click="isShowStencil = false" />
      </template>
      <ReButton :icon="Share" />
      <ReButton :icon="CaretLeft" />
      <ReButton :icon="CaretRight" />
      <ReButton :icon="Delete" />
      <ReButton :icon="ZoomIn" />
      <ReButton :icon="ZoomOut" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ReButton } from '@tingcode/lib-vue'
  import { Delete, ZoomIn, ZoomOut, CaretLeft, CaretRight, Share } from '@element-plus/icons-vue'
  import { useNamespace } from '@tingcode/system'
  import { useAppProviderContext } from '@/application/useAppContext'
  const { isMobile } = toRefs(useAppProviderContext())
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
    flex-direction: column;
  }
</style>
