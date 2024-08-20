<template>
  <div :class="ns.e('microapp')">
    <div class="microapp-wrapper">
      <Icon icon="logo-microapp" size="60" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '@tingcode/lib-vue'
  import { useNamespace } from '@tingcode/system'

  defineOptions({
    name: 'RotationMicroapp'
  })
  const ns = useNamespace('login-main')
</script>

<style lang="scss" scoped>
  @keyframes rotation {
    0% {
      transform: rotate(-230deg);
    }
    100% {
      transform: rotate(130deg);
    }
  }

  @include b(login-main) {
    @include e(microapp) {
      width: 36%;
      height: 88%;
      position: absolute;
      left: 36%;
      top: 16%;
      animation: rotation 38s linear infinite;

      .microapp-wrapper {
        display: inline-block;
        .microapp {
          transform: rotate(0deg);
        }
      }
    }
  }
</style>
