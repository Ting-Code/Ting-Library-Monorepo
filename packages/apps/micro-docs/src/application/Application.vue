<template>
  <!-- 需要AppProvider包裹都放这里 减少app.vue代码 -->
  <el-config-provider :namespace="namespace">
    <slot></slot>
  </el-config-provider>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { onScreenListen, getWindowScreen, screenSizeEnum } from '@tingcode/system'
  import { createAppProviderContext } from './useAppContext'
  import { initSettingMitt, NAMESPACE } from '@/hooks/useSetting'
  const {
    screen: screenInit,
    width: widthInit,
    screenWidth: screenWidthInit,
    isMobile: isMobileInit
  } = getWindowScreen()
  const namespace = ref(NAMESPACE)
  const isMobile = ref<boolean>(isMobileInit)
  const screen = ref<screenSizeEnum>(screenInit || screenSizeEnum.XXL)
  const width = ref(widthInit)
  const screenWidth = ref<number>(screenWidthInit || 0)
  let offSettingMitt

  nextTick(() => {
    // 监听屏幕
    onScreenListen((opt) => {
      isMobile.value = opt.isMobile
      width.value = opt.width
      screenWidth.value = opt.screenWidth || 0
      screen.value = opt.screen || screenSizeEnum.XXL
    })
    // 初始化监听setting
    offSettingMitt = initSettingMitt()
  })

  onBeforeUnmount(() => {
    offSettingMitt()
  })

  // 变量注入全局
  createAppProviderContext({ namespace, isMobile, screen, width, screenWidth })
</script>
