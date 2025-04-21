<template>
  <VChart :option="chartOptions" style="height: 300px" />
</template>

<script setup lang="ts">
  import VChart from 'vue-echarts'
  import 'echarts'

  // 模拟数据
  const data = {
    name: '总数据',
    children: [
      {
        name: '数据1',
        value: 100,
        children: [
          { name: '子数据1', value: 30 },
          { name: '子数据2', value: 70 }
        ]
      },
      {
        name: '数据2',
        value: 200,
        children: [
          { name: '子数据3', value: 80 },
          { name: '子数据4', value: 120 }
        ]
      }
    ]
  }

  const chartOptions = {
    tooltip: {},
    series: [
      {
        name: '旭日图',
        type: 'sunburst',
        data: [data],
        radius: [0, '90%'],
        label: {
          rotate: 'radial'
        }
      }
    ]
  }
</script>
