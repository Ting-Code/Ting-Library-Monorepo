<template>
  <div :class="ns.e('typescript')">
    <div class="typescript-wrapper">
      <Icon icon="logo-typescript" size="80" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useNamespace } from '@tingcode/system'

  defineOptions({
    name: 'RotationTypescript'
  })
  const ns = useNamespace('login-main')
</script>

<style lang="scss" scoped>
  @keyframes rotation {
    0% {
      transform: rotate(-130deg);
    }
    100% {
      transform: rotate(230deg);
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
    @include e(typescript) {
      width: 36%;
      height: 82%;
      position: absolute;
      left: 32%;
      top: 16%;
      animation: rotation 38s linear infinite;

      .typescript-wrapper {
        display: inline-block;
        animation: un-rotation 38s linear infinite;
        .typescript {
          transform: rotate(0deg);
        }
      }
    }
  }
</style>
