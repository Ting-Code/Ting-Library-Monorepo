<template>
  <div :class="ns.e('react')">
    <div class="react-wrapper">
      <Icon icon="logo-react" size="68" />
    </div>
    <div class="next">
      <Icon icon="logo-nextjs" size="38" />
    </div>
    <div class="rspack">
      <Icon class="rspack-icon" icon="logo-rspack" size="38" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useNamespace } from '@tingcode/system'

  defineOptions({
    name: 'RotationReact'
  })
  const ns = useNamespace('login-main')
</script>

<style lang="scss" scoped>
  @keyframes rotation {
    0% {
      transform: rotate(-180deg);
    }
    100% {
      transform: rotate(180deg);
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
      width: 28%;
      height: 88%;
      position: absolute;
      left: 36%;
      top: 8%;
      animation: rotation 38s linear infinite;

      .react-wrapper {
        display: inline-block;
        .react {
          transform: rotate(0deg);
        }
      }

      .next {
        animation: rotation 6s linear infinite;
        height: 160px;
        left: -60px;
        position: absolute;
        top: -63px;
        width: 160px;
      }

      .rspack {
        animation: rotation 8s linear infinite;
        height: 200px;
        left: -50px;
        position: absolute;
        top: -50px;
        width: 200px;

        .rspack-icon {
          animation: un-rotation 6s linear infinite;
        }
      }
    }
  }
</style>
