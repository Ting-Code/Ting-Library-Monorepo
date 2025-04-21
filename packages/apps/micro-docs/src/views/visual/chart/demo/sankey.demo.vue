<template>
  <VChart :option="chartOptions" style="height: 300px" />
</template>

<script setup lang="ts">
  import VChart from 'vue-echarts'
  import 'echarts'

  // 模拟数据
  const data = [{ name: '节点A' }, { name: '节点B' }, { name: '节点C' }, { name: '节点D' }]

  const links = [
    { source: '节点A', target: '节点B', value: 10 },
    { source: '节点A', target: '节点C', value: 20 },
    { source: '节点B', target: '节点D', value: 15 },
    { source: '节点C', target: '节点D', value: 25 }
  ]

  const chartOptions = {
    tooltip: {},
    series: [
      {
        name: '桑基图',
        type: 'sankey',
        data: data,
        links: links,
        emphasis: {
          focus: 'adjacency'
        },
        lineStyle: {
          curveness: 0.5
        }
      }
    ]
  }
</script>
