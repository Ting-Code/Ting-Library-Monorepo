<template>
  <div :class="ns.b()">
    <Icon
      icon="layout-yuque"
      size="28"
      @click="handleOpen('https://www.yuque.com/u2368282/ting')"
    />
    <Icon
      icon="layout-github"
      size="28"
      @click="handleOpen('https://github.com/Ting-Code/Ting-Library-Monorepo')"
    />
    <Icon
      icon="layout-gitee"
      size="28"
      @click="handleOpen('https://gitee.com/ting-code/ting-library-monorepo')"
    />
  </div>
</template>

<script setup lang="ts">
  import { useNamespace } from '@tingcode/system'

  defineOptions({
    name: 'HeaderNavIcon'
  })

  const ns = useNamespace('header-nav-icon')

  const handleOpen = (url: string) => {
    window.open(url, '_blank')
  }
</script>

<style lang="scss">
  @include b(header-nav-icon) {
    display: flex;
    margin-right: 12px;

    > svg {
      margin-right: 12px;
    }
  }
</style>
