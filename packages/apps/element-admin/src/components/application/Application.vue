<template>
  <!-- 需要AppProvider包裹都放这里 减少app代码 -->
  <el-config-provider namespace="ting">
    <slot></slot>
  </el-config-provider>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { createAppProviderContext } from './useAppContext'
  import { useBreakpointListen } from '@/components/application/useBreakpoint'
  const namespace = ref('ting')

  // 监听视窗宽度
  const {
    screenComputedRef: screen,
    widthComputedRef: width,
    isMobileComputedRef: isMobile,
    realWidthComputedRef: realWidth
  } = useBreakpointListen()

  // 变量注入全局
  createAppProviderContext({ namespace, isMobile, screen, width, realWidth })
</script>
