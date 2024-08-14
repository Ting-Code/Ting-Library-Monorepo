<template>
  <!-- 需要AppProvider包裹都放这里 减少app.vue代码 -->
  <el-config-provider :namespace="namespace">
    <slot></slot>
  </el-config-provider>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { addScreenListen, onScreenListen } from '@tingcode/system'
  import { createAppProviderContext } from './useAppContext'
  import { initSettingMitt, NAMESPACE } from '@/hooks/useSetting'
  const namespace = ref(NAMESPACE)
  const isMobile = ref<boolean>(false)
  const screen = ref()
  const width = ref()
  const screenWidth = ref()
  nextTick(() => {
    // 监听屏幕
    onScreenListen((opt) => {
      isMobile.value = opt.isMobile
      screen.value = opt.screen
      width.value = opt.width
      screenWidth.value = opt.screenWidth
    })
    // 添加事件触发监听
    addScreenListen()
    // 初始化监听setting
    const offSettingMitt = initSettingMitt()
    onUnmounted(() => {
      offSettingMitt()
    })
  })

  // 变量注入全局
  createAppProviderContext({ namespace, isMobile, screen, width, screenWidth })
</script>
