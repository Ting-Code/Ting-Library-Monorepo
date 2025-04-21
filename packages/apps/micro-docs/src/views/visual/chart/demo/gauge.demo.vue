<template>
  <VChart :option="chartOptions" style="height: 300px" />
</template>

<script setup lang="ts">
  import VChart from 'vue-echarts'
  import 'echarts'

  // 模拟数据
  const chartOptions = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: '业务指标',
        type: 'gauge',
        detail: {
          formatter: '{value}%'
        },
        data: [
          {
            value: 50,
            name: '完成率'
          }
        ]
      }
    ]
  }
</script>
