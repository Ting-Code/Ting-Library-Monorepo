<template>
  <main :class="ns.b()">
    <router-view>
      <template #default="{ Component, route }">
        <transition v-if="route?.meta?.transition" name="fade-slide" mode="out-in" appear>
          <keep-alive v-if="keepAliveComponents.length" :include="keepAliveComponents">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component v-else :is="Component" :key="route.fullPath" />
        </transition>
        <keep-alive v-else-if="keepAliveComponents.length" :include="keepAliveComponents">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </template>
    </router-view>
  </main>
</template>

<script lang="ts" setup>
  import { useNamespace } from '@/hooks/useNamespace'
  import { useAsyncRouteStoreWidthOut } from '@/store/modules/asyncRoute'
  import { computed } from 'vue'
  // import { isProdMode } from '@/utils/env'
  const asyncRouteStore = useAsyncRouteStoreWidthOut()
  defineOptions({ name: 'LayoutMain' })

  const keepAliveComponents = computed(() => asyncRouteStore.keepAliveComponents)

  const ns = useNamespace('layout-main')
</script>

<style lang="scss">
  @include b(layout-main) {
    flex: 1;
    overflow: hidden;
    background-color: getCssVar('bg-color', 'main');
  }
</style>
