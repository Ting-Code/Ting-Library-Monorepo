<template>
  <div :class="ns.b()">
    <div :class="ns.e('ting')">
      <Icon icon="logo-ting" size="120" />
    </div>
    <RotationVue />
    <RotationReact />
  </div>
</template>

<script lang="ts" setup>
  import { useNamespace } from '@/hooks/useNamespace'
  import RotationVue from './vue.vue'
  import RotationReact from './react.vue'
  import Icon from '@/components/Icon/Icon.vue'

  defineOptions({
    name: 'LoginMain'
  })
  const ns = useNamespace('login-main')
</script>

<style lang="scss">
  @include b(login-main) {
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0;
    left: 0;
    position: absolute;

    @include e(ting) {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      overflow: hidden;
      z-index: 10;
    }
  }
</style>
