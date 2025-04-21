<template>
  <VChart :option="chartOptions" style="height: 300px" />
</template>

<script setup lang="ts">
  import VChart from 'vue-echarts'
  import 'echarts'

  // 模拟数据
  const data = [
    {
      value: [90, 80, 70, 60, 50],
      name: '数据1'
    },
    {
      value: [60, 70, 80, 90, 100],
      name: '数据2'
    }
  ]

  const chartOptions = {
    tooltip: {},
    legend: {
      data: ['数据1', '数据2']
    },
    radar: {
      indicator: [
        { name: '指标1', max: 100 },
        { name: '指标2', max: 100 },
        { name: '指标3', max: 100 },
        { name: '指标4', max: 100 },
        { name: '指标5', max: 100 }
      ]
    },
    series: [{ name: '雷达图', type: 'radar', data: data }]
  }
</script>
