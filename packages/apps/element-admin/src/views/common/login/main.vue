<template>
  <div :class="ns.b()">
    <div :class="ns.e('ting')">
      <Icon icon="common-ting" size="120" />
    </div>

    <div :class="ns.e('vue')">
      <div class="vue-wrapper">
        <Icon icon="common-vue" size="68" />
      </div>
      <div class="mars-moon-orbit-1">
        <div class="mars-moon"></div>
      </div>
      <div class="mars-moon-orbit-2">
        <div class="mars-moon"></div>
      </div>
    </div>

    <div id="saturn-orbit">
      <div id="saturn">
        <div id="ring"></div>
      </div>
    </div>
    <div id="uranus-orbit">
      <div id="uranus"></div>
    </div>
    <div id="neptune-orbit">
      <div id="neptune"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useNamespace } from '@/hooks/useNamespace'
  import Icon from '@/components/Icon/Icon.vue'

  defineOptions({
    name: 'LoginMain'
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
      width: 30%;
      height: 30%;
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
    }
  }

  #mars-orbit {
    -webkit-animation: rotation 44s linear infinite;
    animation: rotation 44s linear infinite;
    height: 30%;
    left: 35%;
    position: absolute;
    top: 35%;
    width: 30%;
  }

  .mars-moon-orbit-1 {
    -webkit-animation: rotation 5s linear infinite;
    animation: rotation 5s linear infinite;
    height: 40px;
    left: -3px;
    position: absolute;
    top: -3px;
    width: 40px;
  }

  .mars-moon-orbit-2 {
    -webkit-animation: rotation 4s linear infinite;
    animation: rotation 4s linear infinite;
    height: 30px;
    left: -10px;
    position: absolute;
    top: -10px;
    width: 30px;
  }

  .mars-moon {
    background-color: #dbc;
    height: 3px;
    width: 3px;

    border-radius: 50%;
  }

  #jupiter-orbit {
    -webkit-animation: rotation 68s linear infinite;
    animation: rotation 68s linear infinite;
    height: 40%;
    left: 30%;
    position: absolute;
    top: 30%;
    width: 40%;
  }

  #saturn-orbit {
    -webkit-animation: rotation 80s linear infinite;
    animation: rotation 80s linear infinite;
    height: 48%;
    left: 26%;
    position: absolute;
    top: 26%;
    width: 48%;
  }

  #saturn {
    background-color: #ab5;
    height: 36px;
    width: 36px;

    border-radius: 50%;
    box-shadow: inset 0 0 5px #451;
  }

  #ring {
    height: 10px;
    left: -10px;
    position: absolute;
    top: 10px;
    width: 55px;

    border-radius: 50%;
    box-shadow: 0 2px 0 4px #ab5, 0 7px 2px 1px #000;
  }

  #uranus-orbit {
    -webkit-animation: rotation 100s linear infinite;
    animation: rotation 100s linear infinite;
    height: 60%;
    left: 20%;
    position: absolute;
    top: 20%;
    width: 60%;
  }

  #uranus {
    background-color: #3da;
    height: 30px;
    width: 30px;

    border-radius: 50%;
    box-shadow: inset 0 0 5px #451;
  }

  #neptune-orbit {
    -webkit-animation: rotation 120s linear infinite;
    animation: rotation 120s linear infinite;
    height: 70%;
    left: 15%;
    position: absolute;
    top: 15%;
    width: 70%;
  }

  #neptune {
    background-color: #05a;
    height: 32px;
    width: 32px;

    border-radius: 50%;
    box-shadow: inset 0 0 10px 1px #000;
  }
</style>
