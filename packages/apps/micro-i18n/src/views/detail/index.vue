<template>
  <div class="i18n-detail">
    <header class="i18n-detail__header">
      <el-button link type="primary" @click="router.back()">← 返回列表</el-button>
      <h1 class="i18n-detail__title">项目详情 · {{ namespace }}</h1>
    </header>
    <p class="i18n-detail__hint">
      UI 待实现 · 设计稿
      <code>design/detail.pen</code>
      （树 + 多语言编辑）
    </p>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()
  const namespace = computed(() => String(route.params.namespace ?? ''))
</script>

<style scoped lang="scss">
  .i18n-detail {
    min-height: 100%;
    padding: 24px;
    box-sizing: border-box;
    background: v('page-bg');
    color: v('text');

    &__header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    &__title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }

    &__hint {
      margin: 0;
      font-size: 13px;
      color: v('text-secondary');

      code {
        color: v('primary');
      }
    }
  }
</style>
