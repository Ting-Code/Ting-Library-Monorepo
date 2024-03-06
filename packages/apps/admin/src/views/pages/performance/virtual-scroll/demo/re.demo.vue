<template>
  <Demo v-bind="$attrs" />
  <REButton type="danger" />
  <REButton type="danger" loading disabled />
  <el-button> {{ app }} </el-button>
</template>
<script setup lang="ts">
  import { Demo } from '@tingcli/lib-vue'
  import { REButton } from '@tingcli/lib-vue'
  defineOptions({
    name: 'ReDemo',
    inheritAttrs: false
  })
  const app = isRef(null)
  console.log(app)
</script>
