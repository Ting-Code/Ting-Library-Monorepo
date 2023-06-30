<template>
  <el-container :class="ns.b()">
    <!--   头部header   -->
    <el-header> <LoginNav /> </el-header>
    <el-main :class="ns.e('main')">
      <LoginMain />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
  import LoginMain from './rotation/index.vue'
  import LoginNav from './nav.vue'
  import { useNamespace } from '@/hooks/useNamespace'

  defineOptions({
    name: 'Login'
  })

  const ns = useNamespace('login')
</script>

<style lang="scss" scoped>
  @include b(login) {
    height: 100%;

    @include e(main) {
      background-color: getCssVar('bg-color', 'main');
    }
  }
</style>
