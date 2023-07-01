<template>
  <div :class="ns.e('vue')">
    <div class="vue-wrapper">
      <Icon icon="logo-vue" size="68" />
    </div>
    <div class="elementui">
      <icon icon="logo-elementui" size="38" />
    </div>
    <div class="pinia">
      <icon class="pinia-icon" icon="logo-pinia" size="38" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useNamespace } from '@/hooks/useNamespace'
  import Icon from '@/components/Icon/Icon.vue'

  defineOptions({
    name: 'RotationVue'
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

    @include e(vue) {
      width: 26%;
      height: 32%;
      position: absolute;
      left: 36%;
      top: 36%;
      animation: rotation 24s linear infinite;

      .vue-wrapper {
        display: inline-block;
        animation: un-rotation 24s linear infinite;
        .vue {
          transform: rotate(0deg);
        }
      }

      .elementui {
        animation: rotation 6s linear infinite;
        height: 160px;
        left: -60px;
        position: absolute;
        top: -63px;
        width: 160px;
      }

      .pinia {
        animation: rotation 8s linear infinite;
        height: 200px;
        left: -50px;
        position: absolute;
        top: -50px;
        width: 200px;

        .pinia-icon {
          animation: un-rotation 6s linear infinite;
        }
      }
    }
  }
</style>
