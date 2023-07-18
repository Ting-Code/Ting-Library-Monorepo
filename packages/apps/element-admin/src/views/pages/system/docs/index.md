# <a id="文档的设计">文档的架构设计</a>

我之前一直是用语雀写文章的，也写的不是太精细，也不太注重流量（大部分自己复盘）。介绍中也说到，语雀开始收费。收费是理解的，但是不靠增值服务收费，而是限制文章开源有点迷，也就是不开会员别人看不到我的文章。所以就有了这个知识库，**不仅停留于文字内容，更能直达源码。** 更有利于自己的学习和复盘，也可以帮助各位小伙伴深入源码理解思路。

## <a id="需求梳理">需求梳理</a>

文档基本上可以把能自动生成的东西都自动生成了，主要有以下功能。

- Markdown 可以导入 Vue
- 可以在 Vue 中写 Markdown
- 渲染效果同时显示源码（类似组件库的文档）
- 根据 src 相对路径生成源码文档，同时生成跳转 Github 的链接
- 自动生成目录导航

### Markdown 可以导入 Vue

我调研一番后这个功能比较好实现，因为有现成的 vite 创建。我发现这个插件是 **`antfu`** 写的就放心的直接用了: [vite-plugin-md](https://github.com/antfu/vite-plugin-md)。具体可看文档，这里就不再赘述。

### Vue 中写 Markdown

我发现这个插件可以实现 Vue 中导入 md，和 md 中导入 Vue。当我需要在文章之间插入一个 demo 时，我就要拆写多个 md，这样就非常不方便。而 md 中导入 Vue 可以满足之间插入 demo，但是这个 demo 需要全局注册也非常不方便。于是我写了一个 vite 插件可以在 vue 中写 markdown。

```html
<MD>
  <pre>
# Markdown
  </pre>
</MD>
```

渲染效果同时显示源码

需要 render 的时候我们就需要拿到 vue 的同时，需要注入源码。用`*.demo.vue`来标志需要注入的组件，将组件的源码注入到属性中去。

```html
<CodeBlock :is="test.demo.vue" />

// test.demo.vue ...
<script>
  const __getSoundCode = () => {
    return code
  }
</script>
```

根据 src 相对路径生成源码文档，同时生成跳转 Github 的链接根据 src 找到文件，直接注入到`CodeBlock`的属性中去。

```html
<CodeBlock src="../App.vue" />

// 注入后
<CodeBlock code="***" />
```

自动生成目录导航

这个功能就不需要 viet 插件了，直接运行时遍历 Dom，获取标签中的`H1~H5标签中的id` 生成目录导航。

```html
<template>
  <DocsLayout> 文档内容 </DocsLayout>
</template>
```
