<template>
  <div :class="ns.b()">
    <!--  left  -->
    <div :class="ns.e('left')">
      <Logo @click="handleLogin" />
    </div>
    <!--  action  -->
    <div :class="ns.e('right')">
      <HeaderNavIcon />
      <HeaderTheme />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import HeaderTheme from '@/components/layouts/default/theme/index.vue'
  import HeaderNavIcon from '@/components/layouts/default/navIcon/index.vue'
  import Logo from '@/components/layouts/default/logo/index.vue'
  import { useNamespace } from '@/hooks/useNamespace'
  import { usePermission } from '@/hooks/usePermission'

  const ns = useNamespace('login-nav')
  const { handleLogin } = usePermission()
</script>

<style lang="scss">
  @include b(login-nav) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include e(left) {
      left: 30px;
      position: absolute;
      display: flex;
      align-items: center;
      z-index: 1000;
    }

    @include e(right) {
      right: 30px;
      position: absolute;
      display: flex;
      align-items: center;
      z-index: 1000;
    }
  }
</style>
