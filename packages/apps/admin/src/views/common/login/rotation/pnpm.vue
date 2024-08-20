<template>
  <div :class="ns.e('pnpm')">
    <div class="pnpm-wrapper">
      <Icon icon="logo-pnpm" size="60" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '@tingcode/lib-vue'
  import { useNamespace } from '@tingcode/system'

  defineOptions({
    name: 'RotationPnpm'
  })
  const ns = useNamespace('login-main')
</script>

<style lang="scss" scoped>
  @keyframes rotation {
    0% {
      transform: rotate(-270deg);
    }
    100% {
      transform: rotate(90deg);
    }
  }

  @keyframes un-rotation {
    0% {
      transform: rotate(90deg);
    }
    100% {
      transform: rotate(-270deg);
    }
  }

  @include b(login-main) {
    @include e(pnpm) {
      width: 26%;
      height: 62%;
      position: absolute;
      left: 36%;
      top: 16%;
      animation: rotation 18s linear infinite;

      .pnpm-wrapper {
        display: inline-block;
        animation: un-rotation 18s linear infinite;
        .pnpm {
          transform: rotate(0deg);
        }
      }
    }
  }
</style>
