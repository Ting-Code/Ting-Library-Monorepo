<template>
  <VChart :option="chartOptions" style="height: 300px" />
</template>

<script setup lang="ts">
  import VChart from 'vue-echarts'
  import 'echarts'

  // 模拟数据
  const data = [
    [12, 44, 55, 66, 2],
    [23, 28, 38, 48, 8],
    [34, 45, 56, 67, 6],
    [45, 56, 67, 78, 4],
    [56, 67, 78, 89, 2]
  ]

  const chartOptions = {
    tooltip: {
      trigger: 'item',
      formatter: '({c})'
    },
    xAxis: {
      type: 'value',
      scale: true
    },
    yAxis: {
      type: 'value',
      scale: true
    },
    series: [
      {
        name: '气泡图',
        type: 'bubble',
        data: data,
        symbolSize: function (data) {
          return data[4] * 10
        }
      }
    ]
  }
</script>
