<template>
  <DocsLayout>
    <IndexMd />
    <CodeBlock src="@root/packages/lib/vue/vite.config.ts" />
    <MD>
      <pre>
## Button二次封装案例
利用```宏编译+TS```继承和增强类型提示。
      </pre>
    </MD>
    <CodeBlock src="@root/packages/lib/vue/src/element-plus/button/index.vue" />
    <MD>
      <pre>
对业务耦合，将重复的业务内置并向外最小差异化。
      </pre>
    </MD>
    <CodeBlock src="@root/packages/lib/vue/src/element-plus/button/index.vue" />
    <MD>
      <pre>
最终效果。
      </pre>
    </MD>
    <CodeBlock :is="ButtonDemo" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import IndexMd from './index.md'
  import ButtonDemo from './demo/button.demo.vue'
  import DocsLayout from '@/components/layouts/docsLayout/index.vue'
  import MD from '@/components/layouts/docsLayout/markdown.vue'
  import CodeBlock from '@/components/layouts/docsLayout/codeBlock/index.vue'
</script>
