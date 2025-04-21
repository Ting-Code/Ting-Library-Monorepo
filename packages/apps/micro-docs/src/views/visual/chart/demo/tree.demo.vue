<template>
  <VChart :option="chartOptions" style="height: 300px" />
</template>

<script setup lang="ts">
  import VChart from 'vue-echarts'
  import 'echarts'

  // 模拟数据
  const data = {
    name: '根节点',
    children: [
      {
        name: '子节点1',
        children: [
          { name: '子子节点1', value: 10 },
          { name: '子子节点2', value: 20 }
        ]
      },
      {
        name: '子节点2',
        children: [
          { name: '子子节点3', value: 30 },
          { name: '子子节点4', value: 40 }
        ]
      }
    ]
  }

  const chartOptions = {
    tooltip: {},
    series: [
      {
        name: '树图',
        type: 'tree',
        data: [data],
        top: '1%',
        bottom: '1%',
        layout: 'orthogonal',
        roam: true,
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left'
        },
        leaves: {
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right'
          }
        }
      }
    ]
  }
</script>
