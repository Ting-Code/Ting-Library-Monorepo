<template>
  <div ref="container" style="width: 100%; height: 600px"></div>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue'
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
        x: 200,
        y: 100,
        width: 60,
        height: 30,
        label: '开始',
        shape: 'rect'
      })

      const approvalNode1 = graph.addNode({
        x: 200,
        y: 200,
        width: 60,
        height: 30,
        label: '审批节点1',
        shape: 'rect'
      })

      // 新增不同角色审批节点
      const roleApprovalNode1 = graph.addNode({
        x: 100,
        y: 300,
        width: 60,
        height: 30,
        label: '角色1审批',
        shape: 'rect'
      })

      const roleApprovalNode2 = graph.addNode({
        x: 300,
        y: 300,
        width: 60,
        height: 30,
        label: '角色2审批',
        shape: 'rect'
      })

      const endNode = graph.addNode({
        x: 200,
        y: 380,
        width: 60,
        height: 30,
        label: '结束',
        shape: 'rect'
      })

      // 模拟审批逻辑
      const approvalCondition = Math.random() > 0.5 // 随机决定走哪个角色审批

      // 从开始节点到审批节点1
      graph.addEdge({
        source: startNode,
        target: approvalNode1
      })

      // 从审批节点1到角色审批节点
      graph.addEdge({
        source: approvalNode1,
        target: roleApprovalNode1,
        label: approvalCondition ? '通过' : '不通过'
      })

      graph.addEdge({
        source: approvalNode1,
        target: roleApprovalNode2,
        label: approvalCondition ? '不通过' : '通过'
      })

      // 从角色审批节点到结束节点
      graph.addEdge({
        source: roleApprovalNode1,
        target: endNode
      })

      graph.addEdge({
        source: roleApprovalNode2,
        target: endNode
      })
    }
  })
</script>
