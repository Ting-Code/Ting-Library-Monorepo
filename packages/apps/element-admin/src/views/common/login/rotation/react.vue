<template>
  <div :class="ns.e('react')">
    <div class="vue-wrapper"> <Icon icon="common-vite" size="38" /></div>
  </div>
</template>

<script lang="ts" setup>
  import { useNamespace } from '@/hooks/useNamespace'
  import Icon from '@/components/Icon/Icon.vue'

  defineOptions({
    name: 'RotationReact'
  })
  const ns = useNamespace('login-main')
</script>

<style lang="scss">
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes un-rotation {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @include b(login-main) {
    @include e(react) {
      height: 40%;
      left: 30%;
      position: absolute;
      top: 30%;
      width: 40%;
      animation: rotation 68s linear infinite;

      .vue-wrapper {
        display: inline-block;
        animation: un-rotation 24s linear infinite;
        .vue {
          transform: rotate(0deg);
        }
      }
    }
  }
</style>
