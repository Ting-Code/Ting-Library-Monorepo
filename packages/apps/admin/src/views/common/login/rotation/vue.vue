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

  defineOptions({
    name: 'RotationVue'
  })
  const ns = useNamespace('login-main')
</script>

<style lang="scss" scoped>
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
    @include e(vue) {
      width: 22%;
      height: 28%;
      position: absolute;
      left: 36%;
      top: 36%;
      animation: rotation 18s linear infinite;

      .vue-wrapper {
        display: inline-block;
        animation: un-rotation 18s linear infinite;
        .vue {
          transform: rotate(0deg);
        }
      }

      .elementui {
        animation: rotation 6s linear infinite;
        width: 160px;
        height: 120px;
        left: -60px;
        position: absolute;
        top: -63px;
      }

      .pinia {
        animation: rotation 8s linear infinite;
        width: 180px;
        height: 180px;
        left: -50px;
        position: absolute;
        top: -50px;

        .pinia-icon {
          animation: un-rotation 6s linear infinite;
        }
      }
    }
  }
</style>
