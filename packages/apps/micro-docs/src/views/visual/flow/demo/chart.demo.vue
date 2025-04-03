<template>
  <div ref="container" style="width: 800px; height: 600px"></div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { Graph } from '@antv/x6'
  import { useSetting } from '@/hooks/useSetting'

  const container = ref<HTMLDivElement | null>(null)
  const { getRootTheme } = useSetting()

  let graph: null | Graph = null

  watch(getRootTheme, () => {
    if (graph) {
      graph.drawBackground({
        color: getRootTheme.value === 'dark' ? '#161616' : '#ffffff'
      })
    }
  })

  onMounted(() => {
    if (container.value) {
      // 创建一个新的图形实例
      graph = new Graph({
        container: container.value,
        grid: true,
        background: {
          color: getRootTheme.value === 'dark' ? '#161616' : '#ffffff'
        }
      })

      // 添加节点
      const startNode = graph.addNode({
        x: 100,
        y: 100,
        width: 80,
        height: 40,
        label: '开始',
        shape: 'rect'
      })

      const processNode = graph.addNode({
        x: 300,
        y: 100,
        width: 80,
        height: 40,
        label: '处理',
        shape: 'rect'
      })

      const endNode = graph.addNode({
        x: 500,
        y: 100,
        width: 80,
        height: 40,
        label: '结束',
        shape: 'rect'
      })

      // 添加边
      graph.addEdge({
        source: startNode,
        target: processNode
      })

      graph.addEdge({
        source: processNode,
        target: endNode
      })
    }
  })
</script>
