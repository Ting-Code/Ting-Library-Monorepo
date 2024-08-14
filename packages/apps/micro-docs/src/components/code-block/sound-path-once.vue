<template>
  <div :class="ns.b()">
    <a :href="`https://github.com/Ting-Code/Ting-Library-Monorepo/blob/master${src}`">
      <span><icon icon="layout-github" size="28" /></span>
      {{ src }}
    </a>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useNamespace } from '@tingcode/system'
  import Icon from '@/components/icon/icon.vue'

  defineOptions({
    name: 'CodeBlockPath'
  })

  const props = defineProps<{
    src?: string
    soundPath?: string
  }>()

  const ns = useNamespace('code-block-path')

  const src = computed(() => {
    return props?.src || props?.soundPath || '/'
  })
</script>

<style lang="scss">
  @include b(code-block-path) {
    padding: 12px 6px;
    > a {
      display: flex;
      align-items: center;
      white-space: break-spaces;
      word-break: break-all;
    }
  }
</style>
