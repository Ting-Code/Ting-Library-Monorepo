<template>
  <el-container :class="ns.b()">
    <LayoutFeature />
    <LayoutHeader />
    <el-container>
      <el-main>
        <main> main </main>
      </el-main>
      <el-footer> Footer2 </el-footer>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
  import LayoutFeature from './feature/index.vue'
  import LayoutHeader from './herder/index.vue'
  import { useNamespace } from '@/hooks/use-namespace'

  const ns = useNamespace('default-layout')
</script>
