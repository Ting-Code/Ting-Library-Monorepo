<template>
  <div :class="ns.b()">
    <pre>
      {{ props.code }}
    </pre>
    <div :class="ns.e('button')">
      <el-button>显示代码</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineOptions } from 'vue'
  import { defineProps } from 'vue'
  import { useNamespace } from '@/hooks/useNamespace'

  defineOptions({
    name: 'CodeBlockCode'
  })

  const props = defineProps<{
    code?: string
  }>()

  const ns = useNamespace('code-block-code')
</script>

<style lang="scss">
  @include b(code-block-code) {
    @include e(button) {
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid red;
    }
  }
</style>
