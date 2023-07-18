<template>
  <div :class="ns.e('text')">
    <div class="title"> Ting Library 文档既架构的知识库 </div>
    <div class="button">
      <el-button type="info" @click="handleLogin">点击开始</el-button>
    </div>
    <div class="text">
      Ting Library 是基于pnpm搭建的monorepo架构文档既架构的知识库。
      主要用于归纳前端生态的解决方案与最佳实践。
      基于Vue3为主应用，结合MicroApp微前端。后期添加React、Nextjs等子应用。
      希望各位小伙伴一起讨论总结，一起进步。
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useNamespace } from '@/hooks/useNamespace'
  import { usePermission } from '@/hooks/usePermission'

  defineOptions({
    name: 'RotationText'
  })
  const ns = useNamespace('login-main')
  const { handleLogin } = usePermission()
</script>

<style lang="scss" scoped>
  @include b(login-main) {
    @include e(text) {
      position: absolute;
      width: 100vw;
      height: 100vh;
      left: 0;
      top: 0;
      backdrop-filter: blur(2px);
      z-index: 10;
      .title {
        font-size: calc(2vw + 10px);
        font-weight: 700;
        position: absolute;
        left: 50%;
        top: 20%;
        white-space: nowrap;
        transform: translateX(-50%);
      }
      .button {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, 100px);
      }
      .text {
        width: 80%;
        max-width: 800px;
        font-size: calc(0.5vw + 10px);
        position: absolute;
        left: 50%;
        top: 50%;
        text-align: justify;
        transform: translate(-50%, 20vh);
      }
    }
  }
</style>
