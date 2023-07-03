<template>
  <AppProvider>
    <router-view />
  </AppProvider>
</template>

<script setup lang="ts">
  import { AppProvider } from '@/components/application'
  import { useDialog } from '@/hooks/useDialog'
  // const change = () => {
  //   document.documentElement.style.setProperty('--ting-color-primary', 'red')
  //   document.documentElement.style.setProperty('--ting-color-primary-light-3', 'red')
  //   document.documentElement.style.setProperty('--ting-color-primary-dark-2', 'red')
  // }
  const { show, close } = useDialog()
  setTimeout(() => {
    show
    setTimeout(() => {
      close()
    })
  }, 2000)
</script>

<style lang="scss" scoped>
  .divider {
  }
</style>
