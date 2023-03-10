<template>
  <el-container :class="ns.b()">
    <LayoutFeature />
    <el-container>
      <el-main>
        <main>
          <admin-main />
        </main>
      </el-main>
      <el-footer> Footer </el-footer>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
  import LayoutFeature from './feature/index.vue'
  import AdminMain from './admin-main/index.vue'
  import { useNamespace } from '@/hooks/use-namespace'

  const ns = useNamespace('default-layout')
</script>

<style scoped lang="scss"></style>
