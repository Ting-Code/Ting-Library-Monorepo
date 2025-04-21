<template>
  <DocsLayout>
    <Markdown>
      <pre>
# 📊数据图表
## 折线图
      </pre>
    </Markdown>
    <CodeBlock :is="LineDemo" type="html" />
    <Markdown>
      <pre>
## 流程图
      </pre>
    </Markdown>
    <CodeBlock :is="FlowDemo" type="html" />
    <Markdown>
      <pre>
## 柱状图
      </pre>
    </Markdown>
    <CodeBlock :is="BarDemo" type="html" />
    <Markdown>
      <pre>
## 散点图
      </pre>
    </Markdown>
    <CodeBlock :is="ScatterDemo" type="html" />
    <Markdown>
      <pre>
## 饼图
      </pre>
    </Markdown>
    <CodeBlock :is="PieDemo" type="html" />
    <Markdown>
      <pre>
## 雷达图
      </pre>
    </Markdown>
    <CodeBlock :is="RadarDemo" type="html" />
    <Markdown>
      <pre>
## 热力图
      </pre>
    </Markdown>
    <CodeBlock :is="HeatmapDemo" type="html" />
    <Markdown>
      <pre>
## 仪表盘
      </pre>
    </Markdown>
    <CodeBlock :is="GaugeDemo" type="html" />
    <Markdown>
      <pre>
## 漏斗图
      </pre>
    </Markdown>
    <CodeBlock :is="FunnelDemo" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import LineDemo from './demo/line.demo.vue'
  import FlowDemo from './demo/flow.demo.vue'
  import BarDemo from './demo/bar.demo.vue'
  import ScatterDemo from './demo/scatter.demo.vue'
  import PieDemo from './demo/pie.demo.vue'
  import RadarDemo from './demo/radar.demo.vue'
  import HeatmapDemo from './demo/heatmap.demo.vue'
  import GaugeDemo from './demo/gauge.demo.vue'
  import FunnelDemo from './demo/funnel.demo.vue'
</script>
