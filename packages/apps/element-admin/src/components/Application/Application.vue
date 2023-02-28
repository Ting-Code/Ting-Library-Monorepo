<template>
  <!-- 需要AppProvider包裹都放这里 减少app代码 -->
  <el-config-provider namespace="ting">
    <slot></slot>
  </el-config-provider>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { createAppProviderContext } from './useAppContext'
  const isMobile = ref(false)
  const prefixCls = ref('ting')

  // 变量注入全局
  createAppProviderContext({ prefixCls, isMobile })
</script>
