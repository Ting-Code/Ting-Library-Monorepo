<template>
  <DocsLayout>
    <Index />
    <MD>
      <pre>
## Vite 插件实现
Vite插件中有许多的钩子，主要常用的钩子有
* `transform` 重要用于编译时转换，可以获取到`code(源码)`和`id(路径)，返回转化后的code`
* `handleHotUpdate` 用于热更新
`createFilter`用于筛选出目标文件，也有利于性能。`.demo.vue`和`.docs.vue` 才做处理
      </pre>
    </MD>
    <CodeBlock
      src="@root/packages/plugin/vite/vite-plugin-code/src/index.ts"
      :defaultShowCode="false"
    />
    <MD>
      <pre>
### 解析Vue代码
`transform` 中可以获取到`code(源码)`和`id(路径)`都是字符串类型。
那么我需要找到`CodeBlock`组件并做一些处理，这时候就需要用到`@vue/compiler-sfc`的`compileTemplate`函数解析Vue文件,许多博客推荐是是`@vue/compiler-core`发现不能编译宏。
* Vue 中写 Markdown： 需要找到MD标签取出内容，`markdown-it`转化后返回
* 渲染效果同时显示源代码的代码块 ： 找到`.demo.vue`文件，将添加一个属性将`code`字符串注入进去并返回
* 根据src显示源代码： 找到CodeBlock下的src属性，`fs`读取src路径文件，将`code`字符串注入`code`属性

ps: 为什么加个 pre 标签呢，因为我已经写好功能发现 vue 中会格式化，加个 pre 主要会避免编辑器的格式化。

      </pre>
    </MD>
    <CodeBlock
      src="@root/packages/plugin/vite/vite-plugin-code/src/transform.ts"
      :defaultShowCode="false"
    />
    <MD>
      <pre>
## 运行时转换
编译时`transform` 中可以获取到`code(源码)`都是转化前的代码，生成目录和美化代码块都需要获取转换后`DOM`。
所以放在运行时转换更加方便。

### 生成目录导航
`DocsLayout`包裹所有`Docs`组件，递归遍历`ref`获取H1~H5标签生成目录信息，同时注入`id`为了锚点导航。

源码在如下`docsLayout`组件。

### 美化代码
直接生成的代码是黑白的，需要`prismjs`做一些处理，原理也是找到指定格式`node`节点然后替换生成新的`node`节点

源码在如下`docsLayout`组件。
      </pre>
    </MD>
    <CodeBlock
      src="@root/packages/apps/admin/src/components/layouts/docsLayout/index.vue"
      :defaultShowCode="false"
      type="html"
    />
    <MD>
      <pre>
## 最终效果
显示源码同时渲染效果
      </pre>
    </MD>
    <CodeBlock :is="ButtonDemo" type="html" />
    <MD>
      <pre>
最终效果可看项目中各个页面的文件，比如当前文档的源码如下：
      </pre>
    </MD>
    <CodeBlock src="./index.docs.vue" :defaultShowCode="false" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import ButtonDemo from './demo/button.demo.vue'
  import DocsLayout from '@/components/layouts/docsLayout/index.vue'
  import Index from './index.md'
  import MD from '@/components/layouts/docsLayout/markdown.vue'
  import CodeBlock from '@/components/layouts/docsLayout/codeBlock/index.vue'
</script>
