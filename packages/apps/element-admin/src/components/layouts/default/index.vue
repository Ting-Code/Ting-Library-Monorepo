<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <main>
          <img :src="Logo" />
          <admin-main />
        </main>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
  import AdminMain from './admin-main/index.vue'
</script>

<style scoped lang="scss"></style>
