<template>
  <div :class="ns.b()">
    <!--  left  -->
    <div>
      <Logo />
    </div>
    <!--  action  -->
    <div :class="ns.e('right')">
      <HeaderNavIcon />
      <HeaderTheme />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import HeaderTheme from '@/components/layouts/default/header/theme/index.vue'
  import HeaderNavIcon from '@/components/layouts/default/navIcon/index.vue'
  import Logo from '@/components/layouts/default/logo/index.vue'
  import { useNamespace } from '@/hooks/useNamespace'

  const ns = useNamespace('login-nav')
</script>

<style lang="scss">
  @include b(login-nav) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include e(right) {
      display: flex;
      align-items: center;
    }
  }
</style>
