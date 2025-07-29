<template>
  <el-container :class="ns.b()">
    <!--   头部header   -->
    <el-header :class="ns.e('header')"> <LoginNav /> </el-header>
    <el-main :class="ns.e('main')">
      <LoginMain />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
  import LoginMain from './components/main/index.vue'
  import LoginNav from './components/nav/index.vue'
  import { useNamespace } from '@tingcode/system'

  defineOptions({
    name: 'Login'
  })

  const ns = useNamespace('login')
</script>

<style lang="scss" scoped>
  @include b(login) {
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
  }
</style>
