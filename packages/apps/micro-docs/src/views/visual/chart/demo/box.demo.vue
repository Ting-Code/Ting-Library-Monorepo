<template>
  <VChart :option="chartOptions" style="height: 300px" />
</template>

<script setup lang="ts">
  import VChart from 'vue-echarts'
  import 'echarts'

  // 模拟数据
  const data = [
    [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880],
    [960, 940, 960, 940, 880, 800, 850, 880, 900, 840],
    [880, 880, 880, 860, 720, 720, 620, 860, 970, 950]
  ]

  const chartOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['数据1', '数据2', '数据3']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '箱线图',
        type: 'boxplot',
        data: data
      }
    ]
  }
</script>
