<template>
  <el-container :class="ns.b()">
    <!--   头部header   -->
    <el-header :class="ns.e('header')"> <LoginNav /> </el-header>
    <el-main :class="ns.e('main')">
      <Galaxy
        :mouse-repulsion="true"
        :mouse-interaction="true"
        :density="1.5"
        :glow-intensity="0.5"
        :saturation="0.8"
        :hue-shift="240"
      />
    </el-main>
    <div :class="ns.e('left')">
      <TextType
        :text="['Welcome to Ting Library', '欢迎来到Ting知识库']"
        :typingSpeed="80"
        :pauseDuration="1600"
        :showCursor="true"
        cursorCharacter="_"
        :className="ns.em('left', 'title')"
      />
      <ShinyText />
    </div>
    <div :class="ns.e('right')">
      <CardSwap />
    </div>
  </el-container>
</template>

<script setup lang="ts">
  import Galaxy from './components/galaxy/index.vue'
  import TextType from './components/text-type/index.vue'
  import ShinyText from './components/start-button/index.vue'
  import CardSwap from './components/card-swap/index.vue'
  import LoginNav from './components/nav/index.vue'
  import { useNamespace } from '@tingcode/system'

  defineOptions({
    name: 'Login'
  })

  const ns = useNamespace('login')
</script>

<style lang="scss" scoped>
  @include b(login) {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    @include e(header) {
      width: 100%;
      background-color: getCssVar('bg-color');
    }

    @include e(main) {
      flex: 1;
      overflow: hidden;
      background-color: getCssVar('bg-color', 'main');
    }

    @include e(left) {
      position: absolute;
      top: 200px;
      left: 20px;
      @include m(title) {
        font-size: 52px;
        font-weight: bold;
        color: getCssVar('text-color', 'primary');
      }
    }
    @include e(right) {
      position: absolute;
      width: 100px;
      height: 100px;
      top: calc(38vh + 200px);
      right: calc(18vh + 100px);
    }
  }
</style>
