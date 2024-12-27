<template>
  <div>利用valueFormat处理绑定值，keepNumbers只允许数字</div>
  <ReInput valueFormat="keepNumbers" v-model="data" />
  <div>利用format来处理显示千分位，只影响显示不影响绑定值</div>
  <ReInput format="thousandsRound2D" v-model="data" />
  <div>可以自定义函数来处理值</div>
  <ReInput
    :format="(val) => `￥ ${val || 0} 元`"
    :valueFormat="(val) => keepNumbers(val, 0)"
    v-model="data"
  />
  <div>支持多个函数/预设函数处理，是一个返回值为下一个函数参数</div>
  <ReInput :format="['thousandsRound2D', (val) => `￥ ${val || 0} 元`]" v-model="data" />
  <div>原有ElInput正常按element文档使用，并且保持良好的属性提示</div>
  <ReInput v-model="data" size="large">
    <template #prefix>
      <el-icon class="el-input__icon"><Search /></el-icon>
    </template>
  </ReInput>
</template>
<script setup lang="ts">
  import { Search } from '@element-plus/icons-vue'
  import { ReInput } from '@tingcode/lib-vue'
  import { keepNumbers } from '@tingcode/utils'
  const data = ref('')
</script>
