<template>
  <div :class="ns.b()">
    <a :href="`https://github.com/Ting-Code/Ting-Library-Monorepo/blob/master${src}`">
      <span><icon icon="layout-github" size="28" /></span>
      {{ src }}
    </a>
  </div>
</template>

<script setup lang="ts">
  import { defineOptions } from 'vue'

  import { defineProps, computed } from 'vue'
  import { useNamespace } from '@/hooks/useNamespace'
  import Icon from '@/components/Icon/Icon.vue'

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
    padding: 8px;
    > a {
      display: flex;
      align-items: center;
      white-space: break-spaces;
      word-break: break-all;
    }
  }
</style>
