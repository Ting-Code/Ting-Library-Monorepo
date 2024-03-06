<template>
  <ElButton type="primary"> 按钮change测试 </ElButton>
  <div class="abc">
    <span class="bok">红色边框2</span>
  </div>
</template>

<script setup lang="ts">
  import { ElButton } from 'element-plus'
  defineOptions({
    name: 'Demo'
  })
</script>

<style lang="scss">
  .abc {
    border: 1px solid red;
    padding: 10px;
    .bok {
      color: red;
    }
  }
</style>
