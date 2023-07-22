<template>
  <DocsLayout>
    <MD>
      <pre>
## 微前端技术选型
微前端这个饼画了好久，一直没时间推进。回到主题，微前端技术选型博客有很多，如: [2023微前端技术方案选型](https://juejin.cn/post/7236021829000691771)。

简单总结如何选型
* 只需要简单嵌套网页选`iframe`或`模块联邦`
* 需要好的兼容性并且只用`webpack`选择[`QianKun`](https://qiankun.umijs.org/zh)
* 需要支持`Vite`选择[`无界`](https://wujie-micro.github.io/doc/)或者文档更健全的[`Micro-App 1.X`](https://micro-zoe.com/docs/1.x/#/zh-cn/start)
      </pre>
    </MD>
    <CodeBlock :is="MicroAppDemo" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import MicroAppDemo from './demo/micro-app.demo.vue'
  import DocsLayout from '@/components/layouts/docsLayout/index.vue'
  import MD from '@/components/layouts/docsLayout/markdown.vue'
  import CodeBlock from '@/components/layouts/docsLayout/codeBlock/index.vue'
</script>
