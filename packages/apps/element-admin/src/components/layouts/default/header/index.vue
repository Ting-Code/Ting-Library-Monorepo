<template>
  <el-header :class="headerClass">
    <!--  left  -->
    <div :class="ns.e('left')">
      <!--   折叠按钮   -->
      <HeaderTrigger />
      <!--   面包屑   -->
      <HeaderBreadcrumb />
    </div>
    <!--  action  -->
    <div :class="ns.e('right')">
      <HeaderSetting />
    </div>
  </el-header>
</template>

<script setup lang="ts">
  import HeaderTrigger from './trigger/index.vue'
  import HeaderBreadcrumb from './breadcrumb/index.vue'
  import HeaderSetting from './setting/index.vue'
  import { useNamespace } from '@/hooks/useNamespace'
  import { computed } from 'vue'

  defineOptions({
    name: 'LayoutHeader'
  })

  const props = defineProps<{ fixed?: boolean }>()
  const ns = useNamespace('layout-herder')

  const headerClass = computed(() => [
    ns.b(),
    {
      [ns.e('fixed')]: props.fixed
    }
  ])
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
    vertical-align: middle;

    @include e(fixed) {
      position: fixed;
      top: 0;
      left: 0;
      z-index: getCssVar(top-z-index);
      width: 100%;
    }

    @include e(left) {
      display: flex;
      align-items: center;
    }

    @include e(right) {
      display: flex;
      align-items: center;
    }
  }
</style>
