<template>
  <el-container :class="ns.b()">
    <!--   头部header   -->
    <el-header> <LoginNav /> </el-header>
    <el-main :class="ns.e('main')">
      <div class="banner">
        <h1>Ting UI</h1>
        <h2>基于Vue3的UI框架</h2>
        <p class="actions">
          <a target="_blank" href="https://gitee.com/TINGCYGF/vue3-ting-ui" class="git">码 云</a>
          <a target="_blank" href="https://github.com/TINGCYGF/vue3-ting-ui">GitHub</a>
          <a @click="handleLogin">开始</a>
        </p>
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
  import LoginNav from './nav.vue'
  import { useUserStore } from '@/store/modules/user'
  import { PageEnum } from '@/router/type'
  import { ElMessage } from 'element-plus'
  import { useRoute, useRouter } from 'vue-router'
  import { useNamespace } from '@/hooks/useNamespace'

  defineOptions({
    name: 'Login'
  })

  const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME
  const userStore = useUserStore()
  const ns = useNamespace('login')

  const router = useRouter()
  const route = useRoute()
  const handleLogin = async () => {
    await userStore.login()
    const toPath = decodeURIComponent((route.query?.redirect as string) || '/')
    ElMessage.success('登录成功，即将进入系统')
    if (route.name === LOGIN_NAME) {
      await router.replace('/')
    } else await router.replace(toPath)
  }
</script>

<style lang="scss" scoped>
  @include b(login) {
    height: 100%;

    @include e(main) {
      background-color: getCssVar('bg-color', 'main');
    }
  }
</style>
