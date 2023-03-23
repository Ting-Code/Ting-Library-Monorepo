<template>
  <el-header :class="ns.b()">
    <!--  left  -->
    <div>
      <!--   logo   -->
      <AppLogo />
      <!--   折叠按钮   -->
      <LayoutTrigger />
    </div>
  </el-header>
</template>

<script setup lang="ts">
  import AppLogo from './app-logo/index.vue'
  import LayoutTrigger from './trigger/index.vue'
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
    @include set-component-css-var('layout-herder', $layout-herder);

    @include e(kfc) {
      background: getCssVar('layout-herder', 'border-color');
      @include m(app) {
        background: red;
      }
    }
  }
</style>
