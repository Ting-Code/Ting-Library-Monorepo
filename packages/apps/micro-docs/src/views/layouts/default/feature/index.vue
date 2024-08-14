<template>
  <SettingDrawer />
  <el-drawer
    :modelValue="!isOpenSliderRef"
    @update:modelValue="toggleIsOpenSlider"
    size="auto"
    direction="ltr"
    :with-header="false"
    v-if="isMobile"
    :class="ns.e('drawer')"
  >
    <LayoutAside />
  </el-drawer>
</template>

<script setup lang="ts">
  import SettingDrawer from './setting/index.vue'
  import { toRefs } from 'vue'
  import { useAppProviderContext } from '@/views/application/useAppContext'
  import LayoutAside from '@/views/layouts/default/aside/index.vue'
  import { useSetting } from '@/hooks/useSetting'
  import { useNamespace } from '@tingcode/system'
  defineOptions({
    name: 'LayoutFeature'
  })

  const ns = useNamespace('layout-feature')
  const { isMobile } = toRefs(useAppProviderContext())
  const { isOpenSliderRef, toggleIsOpenSlider } = useSetting()
</script>

<style lang="scss">
  @include b(layout-feature) {
    @include e(drawer) {
      .#{$namespace}-drawer__body {
        padding: 0;
        min-height: 100%;
      }
    }
  }
</style>
