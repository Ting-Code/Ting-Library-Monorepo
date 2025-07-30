<template>
  <div :class="ns.b()">
    <div :class="ns.e('one-box')">
      <div :class="ns.em('one-box', 'threads')">
        <Threads :color="[0.2, 0.6, 1]" :amplitude="3.8" :enableMouseInteraction="true" />
      </div>
      <div :class="ns.em('one-box', 'left')">
        <TextType
          :text="['Welcome to Ting Library', '欢迎来到Ting知识库']"
          :typingSpeed="80"
          :pauseDuration="1600"
          :showCursor="true"
          cursorCharacter="_"
          :className="ns.em('one-box', 'title')"
        />
        <ShinyText />
      </div>
      <div :class="ns.em('one-box', 'right')">
        <CardSwap />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useNamespace } from '@tingcode/system'
  import Threads from './components/threads/index.vue'
  import TextType from './components/text-type/index.vue'
  import ShinyText from './components/start-button/index.vue'
  import CardSwap from './components/card-swap/index.vue'

  defineOptions({
    name: 'LoginMain'
  })

  const ns = useNamespace('login-main')
</script>

<style lang="scss" scoped>
  @include b(login-main) {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    @include e(one-box) {
      position: relative;
      width: 100%;
      height: 1900px;
      overflow: hidden;

      @include m(threads) {
        height: 500px;
        width: 100%;
      }

      @include m(right) {
        position: absolute;
        width: 100px;
        height: 100px;
        top: calc(38vh + 200px);
        right: calc(18vh + 100px);
      }

      @include m(left) {
        position: absolute;
        top: 200px;
        left: 20px;
      }
      @include m(title) {
        font-size: 52px;
        font-weight: bold;
        color: getCssVar('text-color', 'primary');
      }
    }
  }
</style>
