<template>
  <div :class="ns.b()">
    <!--  left  -->
    <div :class="ns.e('left')">
      <Logo @click="loginSystem" />
    </div>
    <!--  action  -->
    <div :class="ns.e('right')">
      <HeaderNavIcon />
      <HeaderTheme />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import HeaderTheme from '@/views/layouts/default/theme/index.vue'
  import HeaderNavIcon from '@/views/layouts/default/navIcon/index.vue'
  import Logo from '@/views/layouts/default/logo/index.vue'
  import { useNamespace, loginSystem } from '@tingcode/system'

  const ns = useNamespace('login-nav')
</script>

<style lang="scss">
  @include b(login-nav) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include e(left) {
      left: calc(2vw);
      position: absolute;
      display: flex;
      align-items: center;
      z-index: 1000;
    }

    @include e(right) {
      right: calc(2vw);
      position: absolute;
      display: flex;
      align-items: center;
      z-index: 1000;
    }
  }
</style>
