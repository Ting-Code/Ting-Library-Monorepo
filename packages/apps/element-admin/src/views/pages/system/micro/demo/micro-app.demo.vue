<template>
  <micro-app
    name="rspackApp"
    :url="`${isProdMode() ? 'http://139.199.173.241/rspack/' : 'http://localhost:8080/'}`"
  />
</template>

<script setup lang="ts">
  import { isProdMode } from '@/utils/env'
  import { useRoute, useRouter } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  const { ...query } = route.query
  router.replace({ query: { ...query, rspackApp: '/microAppDemo' } })
</script>
