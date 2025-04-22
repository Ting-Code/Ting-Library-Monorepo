<template>
  <DocsLayout>
    <Markdown>
      <pre>
# 📊动画
      </pre>
    </Markdown>
    <Markdown>
      <pre>
## 缓冲动画
      </pre>
    </Markdown>
    <CodeBlock :is="BaseDemo" type="html" />
    <Markdown>
      <pre>
## 淡入动画
      </pre>
    </Markdown>
    <CodeBlock :is="FadeDemo" type="html" />
    <Markdown>
      <pre>
## 弹跳动画
      </pre>
    </Markdown>
    <CodeBlock :is="BounceDemo" type="html" />
    <Markdown>
      <pre>
## 滑动动画
      </pre>
    </Markdown>
    <CodeBlock :is="SlideDemo" type="html" />
    <Markdown>
      <pre>
## 旋转动画
      </pre>
    </Markdown>
    <CodeBlock :is="RotateDemo" type="html" />
    <Markdown>
      <pre>
## 缩放动画
      </pre>
    </Markdown>
    <CodeBlock :is="ScaleDemo" type="html" />
    <Markdown>
      <pre>
## 脉冲动画
      </pre>
    </Markdown>
    <CodeBlock :is="PulseDemo" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import BaseDemo from './demo/base.demo.vue'
  import FadeDemo from './demo/fade.demo.vue'
  import BounceDemo from './demo/bounce.demo.vue'
  import SlideDemo from './demo/slide.demo.vue'
  import RotateDemo from './demo/rotate.demo.vue'
  import ScaleDemo from './demo/scale.demo.vue'
  import PulseDemo from './demo/pulse.demo.vue'
</script>
