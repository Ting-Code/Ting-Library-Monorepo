<template>
  <el-container :class="ns.b()">
    <!--   头部header   -->
    <el-header :class="ns.e('header')"> <LoginNav /> </el-header>
    <el-main :class="ns.e('main')">
      <Galaxy
        :mouse-repulsion="true"
        :mouse-interaction="true"
        :density="2"
        :glow-intensity="0.3"
        :saturation="0.6"
        :hue-shift="280"
        :star-speed="0.2"
      />
    </el-main>
    <div :class="ns.e('left')" v-if="!isMobile">
      <TextType
        :text="['Welcome to Ting Library', '欢迎来到Ting知识库']"
        :typingSpeed="80"
        :pauseDuration="1600"
        :showCursor="true"
        cursorCharacter="_"
        :className="ns.em('left', 'title')"
      />
      <div :class="ns.em('left', 'text')">
        基于 Monorepo 搭建的架构与文档于一体的知识库，沉淀技术解决方案并提供直达源码的直观文档。
      </div>
      <ShinyText text="快速开始" />
    </div>
    <div :class="ns.e('right')" v-if="!isMobile">
      <CardSwap />
    </div>
    <div :class="ns.e('top')" v-if="isMobile">
      <TextType
        :text="['Welcome to Ting Library', '欢迎来到Ting知识库']"
        :typingSpeed="80"
        :pauseDuration="1600"
        :showCursor="true"
        cursorCharacter="_"
        :className="ns.em('top', 'title')"
      />
      <div :class="ns.em('top', 'text')">
        基于 Monorepo 搭建的架构与文档于一体的知识库，沉淀技术解决方案并提供直达源码的直观文档。
      </div>
      <ShinyText text="快速开始" />
    </div>
    <div :class="ns.e('bottom')" v-if="isMobile">
      <CardSwap />
    </div>
  </el-container>
</template>

<script setup lang="ts">
  import { useAppProviderContext } from '@/views/application/useAppContext'
  import Galaxy from './components/galaxy/index.vue'
  import TextType from './components/text-type/index.vue'
  import ShinyText from './components/start-button/index.vue'
  import CardSwap from './components/card-swap/index.vue'
  import LoginNav from './components/nav/index.vue'
  import { useNamespace } from '@tingcode/system'

  defineOptions({
    name: 'Login'
  })
  const { isMobile } = toRefs(useAppProviderContext())
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
      top: calc(50vh - 100px);
      left: calc(8vw + 20px);
      @include m(title) {
        font-size: calc(1vw + 30px);
        font-weight: bold;
        color: getCssVar('text-color', 'primary');
        padding-bottom: 20px;
      }
      @include m(text) {
        font-size: calc(0.5vw + 8px);
        padding-bottom: 38px;
        color: #a7ef9e;
        max-width: calc(28vh + 220px);
        text-shadow:
          0 0 2px rgba(255, 255, 255, 0.1),
          0 0 4px rgba(255, 255, 255, 0.3),
          0 0 8px rgba(255, 255, 255, 0.4),
          0 0 136px rgba(60, 255, 79, 0.8);
      }
    }
    @include e(right) {
      position: absolute;
      width: 100px;
      height: 100px;
      top: calc(38vh + 200px);
      right: calc(12vw + 100px);

      @include min-XXL {
        top: calc(38vh + 300px);
        right: calc(12vw + 100px);
      }
    }
    @include e(top) {
      position: absolute;
      width: 100vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      top: calc(20vh - 60px);
      @include m(title) {
        font-size: calc(1vw + 22px);
        font-weight: bold;
        color: getCssVar('text-color', 'primary');
        padding-bottom: 20px;
      }
      @include m(text) {
        font-size: calc(0.5vw + 12px);
        padding-bottom: 38px;
        color: #a7ef9e;
        max-width: calc(80vw);
        text-align: center;
        text-shadow:
          0 0 2px rgba(255, 255, 255, 0.1),
          0 0 4px rgba(255, 255, 255, 0.3),
          0 0 8px rgba(255, 255, 255, 0.4),
          0 0 136px rgba(60, 255, 79, 0.8);
      }
    }
    @include e(bottom) {
      position: absolute;
      top: calc(60vh + 220px);
      right: calc(50vw);
    }
  }
</style>
