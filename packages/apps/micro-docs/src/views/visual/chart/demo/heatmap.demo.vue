<template>
  <VChart :option="chartOptions" style="height: 300px" />
</template>

<script setup lang="ts">
  import VChart from 'vue-echarts'
  import 'echarts'

  // 模拟数据
  const data = []
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      data.push([i, j, Math.floor(Math.random() * 100)])
    }
  }

  const chartOptions = {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    },
    yAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    },
    visualMap: {
      min: 0,
      max: 100
    },
    series: [{ name: '热力图', type: 'heatmap', data: data }]
  }
</script>
