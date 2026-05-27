<template>
  <micro-app
    v-if="name && url"
    :name="name"
    :url="url"
    :baseroute="`/${name}/`"
    :iframe="isIframe"
    router-mode="native"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { devMicroUrlMap, useMicro } from '@tingcode/system'

  const route = useRoute()
  const microKeys = Object.keys(devMicroUrlMap) as (keyof typeof devMicroUrlMap)[]

  function resolveModuleByPath(pathname: string) {
    const current = pathname.replace(/\/+$/, '') || '/'
    return microKeys.find((key) => {
      const base = `/${key}`
      return current === base || current.startsWith(`${base}/`)
    })
  }

  const moduleKey = computed(() => {
    for (let i = route.matched.length - 1; i >= 0; i--) {
      const m = route.matched[i].meta?.module as string | undefined
      if (m && m in devMicroUrlMap) return m as keyof typeof devMicroUrlMap
    }
    return resolveModuleByPath(route.path)
  })

  const micro = computed(() => {
    const key = moduleKey.value
    if (!key) return { url: '', name: '', isIframe: false }
    return useMicro(key)
  })

  const url = computed(() => micro.value.url)
  const name = computed(() => micro.value.name)
  const isIframe = computed(() => micro.value.isIframe)
</script>

<style lang="scss">
  micro-app,
  micro-app-body {
    height: 100%;
    > div {
      height: 100%;
    }
  }
</style>
