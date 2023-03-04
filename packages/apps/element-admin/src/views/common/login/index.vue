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
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/store/modules/user'
  import { PageEnum } from '@/router/type'

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

<style lang="scss" scoped>
  $buttonColor: rgb(52, 176, 176);
  $textColor: rgb(29, 110, 94);

  .home {
    ::v-deep(.top_nav) {
      background: transparent;
    }

    @media (max-width: 500px) {
      ::v-deep(.top_nav) {
        background: #fff;
      }
    }

    .banner {
      padding: 180px 0 150px;
      color: $textColor;
      background: rgb(174, 209, 228);
      background: linear-gradient(135deg, rgb(209, 238, 238) 0%, rgb(1, 171, 166) 100%);
      clip-path: ellipse(80% 60% at 50% 40%);
      margin: 0 auto;

      h1 {
        text-align: center;
        font-size: 34px;
        line-height: 52px;
      }

      h2 {
        text-align: center;
        margin-top: 12px;
        font-size: 20px;
        line-height: 26px;
      }
      > .actions {
        padding: 8px 0;
        font-size: 18px;
        margin-top: 16px;
        text-align: center;

        a {
          margin: 0 8px;
          background: $buttonColor;
          padding: 8px 26px;
          color: #fff;
          border-radius: 6px;
          border: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      @media (max-width: 800px) {
        padding: 126px 0 20px;
        background: linear-gradient(135deg, rgb(209, 238, 238) 0%, rgb(1, 171, 166) 100%);
        clip-path: ellipse(88% 68% at 50% 44%);

        > .actions {
          display: block;
          margin: 16px auto 0;
          width: 180px;
          padding: 8px 0;
          font-size: 18px;
          text-align: center;
          > a {
            display: inline-block;
            min-width: 8em;
            margin: 6px;
            padding: 10px;
          }
        }
      }
    }

    .features {
      margin: 68px auto 24px;
      width: 300px;
      @media (min-width: 800px) {
        margin: 64px auto;
        width: 800px;
        h3 {
          font-size: 16px;
        }
        p {
          font-size: 14px;
        }
      }
      @media (min-width: 1200px) {
        width: 1200px;
      }

      > ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        > li {
          width: 300px;
          margin: 16px 0;
          display: grid;
          justify-content: start;
          align-content: space-between;
          grid-template-areas:
            'icon title'
            'icon text';
          grid-template-columns: 80px auto;
          grid-template-rows: 1fr auto;

          > svg {
            grid-area: icon;
            width: 64px;
            height: 64px;
          }

          > h3 {
            margin-bottom: 10px;
            grid-area: title;
            font-size: 24px;
          }

          > p {
            grid-area: text;
            font-size: 18px;
          }
        }
      }
    }
  }
</style>
