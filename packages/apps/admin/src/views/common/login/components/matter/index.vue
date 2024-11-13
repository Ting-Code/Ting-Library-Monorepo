<template>
  <div :class="ns.b()" ref="matterRef"></div>
</template>

<script lang="ts" setup>
  // import { ElMessageBox } from 'element-plus'
  import { useNamespace, loginSystem } from '@tingcode/system'
  import { initMatter } from './hooks/matter'
  const ns = useNamespace('matter')

  const matterRef = ref()
  onMounted(() => {
    initMatter(matterRef.value)
    setTimeout(() => {
      handleTipLogin()
    }, 3000)
  })

  const handleTipLogin = () => {
    const userConfirmed = window.confirm(
      '点击【确认】可进入文档，【取消】则继续停留该页面，或者点击左上方[Ting图标]可进入文档。'
    )
    if (userConfirmed) {
      loginSystem()
    }
  }
</script>

<style lang="scss" scoped>
  @include b(matter) {
    width: 100%;
    height: 100%;
    overflow: hidden;

    @include e(left) {
      display: flex;
    }
  }
</style>
