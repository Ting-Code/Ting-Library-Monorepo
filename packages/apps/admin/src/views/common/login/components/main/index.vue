<template>
  <el-container :class="ns.b()">
    <el-main :class="ns.e('main')" />
  </el-container>
</template>

<script setup lang="ts">
  import { useNamespace, loginSystem } from '@tingcode/system'

  defineOptions({
    name: 'LoginMain'
  })

  const handleLogin = () => {
    loginSystem()
  }
  console.log('🚀 ~ handleLogin ~ handleLogin:', handleLogin)

  const ns = useNamespace('login-main')
</script>

<style lang="scss" scoped>
  @include b(login-main) {
    height: 100%;

    @include e(main) {
    }
  }
</style>
