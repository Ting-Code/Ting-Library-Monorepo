<template>
  <VChart :option="chartOptions" style="height: 300px" />
</template>

<script setup lang="ts">
  import VChart from 'vue-echarts'
  import 'echarts'

  // 模拟数据
  const data = [
    { name: '北京', value: 100 },
    { name: '上海', value: 200 },
    { name: '广州', value: 150 }
  ]

  const chartOptions = {
    tooltip: {},
    visualMap: {
      min: 0,
      max: 200
    },
    series: [{ name: '地图', type: 'map', map: 'china', data: data }]
  }
</script>
