<template>
  <AppProvider>
    <router-view />
  </AppProvider>
</template>

<script setup lang="ts">
  import { AppProvider } from '@/components/application'
  import { ref } from 'vue'
  const time = ref(0)
  const testTimeOut = () => {
    setTimeout(() => {
      time.value += 1
      console.log(time.value + '分钟')
      testTimeOut()
    }, 60 * 1000)
  }
  testTimeOut()
</script>
