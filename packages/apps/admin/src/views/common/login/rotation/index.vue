<template>
  <div :class="ns.b()">
    <div :class="ns.e('ting')" @click="loginSystem">
      <Icon class="ting-icon" icon="logo-ting" size="160" />
    </div>
    <RotationVue />
    <RotationReact />
    <RotationVite />
    <RotationText />
    <RotationPnpm />
    <RotationTypescript />
    <RotationMicroapp />
  </div>
</template>

<script lang="ts" setup>
  import { useNamespace } from '@tingcode/system'
  import { Icon } from '@tingcode/lib-vue'
  import RotationVue from './vue.vue'
  import RotationReact from './react.vue'
  import RotationVite from './vite.vue'
  import RotationText from './text.vue'
  import RotationPnpm from './pnpm.vue'
  import RotationMicroapp from './microapp.vue'
  import RotationTypescript from './ts.vue'
  import { loginSystem } from '@tingcode/system'

  defineOptions({
    name: 'LoginMain'
  })
  const ns = useNamespace('login-main')
</script>

<style lang="scss">
  @keyframes rotation {
    0% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }

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
      border-radius: 50%;
      overflow: hidden;
      transform: translate(-50%, -50%);
      z-index: 100;
      .ting-icon {
        animation: rotation 1s linear infinite;
      }
    }
  }
</style>
