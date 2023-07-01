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
  import { useAppProviderContext } from '@/components/application/useAppContext'
  import LayoutAside from '@/components/layouts/default/aside/index.vue'
  import { useRootSetting } from '@/hooks/useSetting/useRootSetting'
  import { useNamespace } from '@/hooks/useNamespace'

  defineOptions({
    name: 'LayoutFeature'
  })

  const ns = useNamespace('layout-feature')
  const { isMobile } = toRefs(useAppProviderContext())
  const { isOpenSliderRef, toggleIsOpenSlider } = useRootSetting()
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
