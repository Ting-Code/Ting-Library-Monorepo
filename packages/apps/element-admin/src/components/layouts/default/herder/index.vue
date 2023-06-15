<template>
  <header :class="ns.b()">
    <!--  left  -->
    <div :class="ns.e('left')">
      <!--   logo   -->
      <AppLogo />
      <!--   折叠按钮   -->
      <LayoutTrigger />
    </div>
    <!--  action  -->
    <div :class="ns.e('right')">
      <SettingIcon />
    </div>
  </header>
</template>

<script setup lang="ts">
  import AppLogo from './app-logo/index.vue'
  import LayoutTrigger from './trigger/index.vue'
  import SettingIcon from './setting-icon/index.vue'
  import { useNamespace } from '@/hooks/use-namespace'
  const ns = useNamespace('layout-herder')
</script>

<style lang="scss" scoped>
  @use 'sass:map';
  //@use '@/styles/mixin/mixin.scss' as *;
  //@use '@/styles/mixin/function.scss' as *;

  $layout-herder: () !default;
  $layout-herder: map.merge(
    (
      'font-weight': getCssVar('color-demo'),
      'border-color': getCssVar('color-demo-page')
    ),
    $layout-herder
  );

  @include b(layout-herder) {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include e(left) {
      display: flex;
      align-items: center;

      @include m(app) {
        background: red;
      }
    }

    @include e(right) {
      display: flex;
      align-items: center;
    }
  }
</style>
