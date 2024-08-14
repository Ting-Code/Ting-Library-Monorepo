<template>
  <DocsLayout>
    <IndexMd />
    <CodeBlock src="@root/packages/lib/vue/vite.config.ts" />
    <Markdown>
      <pre>
## Button二次封装案例
利用```宏编译+TS```继承和增强类型提示。
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/lib/vue/src/element-plus/button/index.vue" />
    <Markdown>
      <pre>
对业务耦合，将重复的业务内置并向外最小差异化。比如搜索、确定等频繁出现的按钮统一处理。
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/lib/vue/src/element-plus/button/index.vue" />
    <Markdown>
      <pre>
最终效果: 有良好的（属性：属性值）提示，并且兼容原有Element组件基础上拓展了功能减少属性冗余。
      </pre>
    </Markdown>
    <CodeBlock :is="ButtonDemo" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import IndexMd from './index.md'
  import ButtonDemo from './demo/button.demo.vue'
</script>
