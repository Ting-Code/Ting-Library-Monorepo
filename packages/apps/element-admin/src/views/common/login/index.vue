<template>
  <div class="home">
    <div class="banner">
      <h1>Ting UI</h1>
      <h2>基于Vue3的UI框架</h2>
      <p class="actions">
        <a target="_blank" href="https://gitee.com/TINGCYGF/vue3-ting-ui" class="git">码 云</a>
        <a target="_blank" href="https://github.com/TINGCYGF/vue3-ting-ui">GitHub</a>
        <a @click="handleLogin">开始</a>
      </p>
    </div>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <div>
      <div :class="ns.b()">
        首层
        <div :class="ns.e('kfc')">
          第二层
          <div :class="ns.em('kfc', 'app')"> 第三层 </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/store/modules/user'
  import { PageEnum } from '@/router/type'

  import { ElMessage } from 'element-plus'
  import { useRoute, useRouter } from 'vue-router'
  import { useNamespace } from '@/hooks/use-namespace'
  const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME
  const userStore = useUserStore()

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

  const ns = useNamespace('test')
</script>

<style lang="scss" scoped>
  @use 'sass:map';
  //@use '@/styles/mixin/mixin.scss' as *;
  //@use '@/styles/mixin/function.scss' as *;

  $button: () !default;
  $button: map.merge(
    (
      'font-weight': getCssVar('color-demo'),
      'border-color': getCssVar('color-demo-page')
    ),
    $button
  );

  @include b(test) {
    @include set-component-css-var('test', $button);
    background: getCssVar('test', 'font-weight');

    @include e(kfc) {
      background: getCssVar('test', 'border-color');
      @include m(app) {
        background: red;
      }
    }
  }
</style>
