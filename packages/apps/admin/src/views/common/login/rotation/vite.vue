<template>
  <div :class="ns.e('vite')">
    <div class="vite-wrapper">
      <Icon icon="logo-vite" size="60" />
    </div>
    <div class="unocss">
      <icon class="unocss-icon" icon="logo-unocss" size="38" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useNamespace } from '@/hooks/useNamespace'
  import Icon from '@/components/Icon/Icon.vue'

  defineOptions({
    name: 'RotationVite'
  })
  const ns = useNamespace('login-main')
</script>

<style lang="scss" scoped>
  @keyframes rotation {
    0% {
      transform: rotate(-90deg);
    }
    100% {
      transform: rotate(270deg);
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
    @include e(vite) {
      width: 36%;
      height: 32%;
      position: absolute;
      left: 36%;
      top: 36%;
      animation: rotation 18s linear infinite;

      .vite-wrapper {
        display: inline-block;
        animation: un-rotation 18s linear infinite;
        .vite {
          transform: rotate(0deg);
        }
      }

      .unocss {
        animation: rotation 8s linear infinite;
        height: 120px;
        left: -50px;
        position: absolute;
        top: -50px;
        width: 200px;

        .unocss-icon {
          animation: un-rotation 6s linear infinite;
        }
      }
    }
  }
</style>
