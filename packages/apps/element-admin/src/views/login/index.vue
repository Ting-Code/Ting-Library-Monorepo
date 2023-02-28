<template>
  <el-button @click="handleLogin">啊啊啊</el-button>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/store/modules/user'
  import { PageEnum } from '@/enums/pageEnum'

  import { ElMessage } from 'element-plus'
  import { useRoute, useRouter } from 'vue-router'
  const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME
  const userStore = useUserStore()

  const router = useRouter()
  const route = useRoute()
  const handleLogin = async () => {
    await userStore.login()
    const toPath = decodeURIComponent((route.query?.redirect as string) || '/')
    ElMessage.success('登录成功，即将进入系统')
    if (route.name === LOGIN_NAME) {
      router.replace('/')
    } else router.replace(toPath)
  }
</script>
