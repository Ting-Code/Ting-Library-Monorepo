# <a id="文档的设计">文档的设计</a>

我之前一直是用语雀写文章的，也写的不是太精细，也不太注重流量（大部分自己复盘）。介绍中也说到，语雀开始收费。收费是理解的，但是不靠增值服务收费，而是限制文章开源有点迷，也就是不开会员别人看不到我的文章。所以就有了这个知识库，不仅停留于文字内容，更能直达源码。更有利于自己的学习和复盘，也可以帮助各位小伙伴深入源码理解思路。

## <a id="需求梳理">需求梳理</a>

- Markdown 可以导入 Vue
- 可以在 Vue 中写 Markdown
- 渲染效果同时显示源代码的代码块
- 点击直达源码
- 侧边导航直接跳转

接下来分别实现

### <a id="Markdown导入Vue">Markdown 导入 Vue</a>

我调研一番后这个功能比较好实现，因为有现成的 vite 创建。我发现这个插件是 antfu 写的就放心的直接用了: [vite-plugin-md](https://github.com/antfu/vite-plugin-md)。具体可看文档，这里就不再赘述。

### <a id="Vue中写Markdown">Vue 中写 Markdown</a>

我发现这个插件可以实现 Vue 中导入 md，和 md 中导入 Vue。当我需要在文章之间插入一个 demo 时，我就要拆写多个 md，这样就非常不方便。而 md 中导入 Vue 可以满足之间插入 demo，但是这个 demo 需要全局注册也非常不方便。于是我写了一个 vite 插件可以在 vue 中写 markdown。

思路也非常简单：识别 markdown 标签，将其中的 md 内容转为 html 再注入到 markdown 标签。

```vue
<Markdown>
      <pre>
# Markdown
我把几个功能集成到一个Vite插件中了，所以下面结合源码一起讲实现。
      </pre>
    </Markdown>
```

ps: 为什么加个 pre 标签呢，因为我已经写好功能发现 vue 中会格式化，加个 pre 主要会避免编辑器的格式化。

### <a id="渲染效果同时显示源代码的代码块">渲染效果同时显示源代码的代码块</a>

主要有两种思路

- 需要 render 出来的 vue 文件
- 只需要显示源码

需要 render 的时候我们就需要拿到 vue 的同时，需要注入源码。用`*.demo.vue`来标志需要注入的组件，将组件的源码注入到属性中去。

```vue
<CodeBlock :is="test.demo.vue" />

// test.demo.vue ...
<script>
  const __getSoundCode = () => {
    return code
  }
</script>
```

只显示源码，就直接找到文件，直接注入到`CodeBlock`的属性中去。

```vue
<CodeBlock src="../App.vue" />

// 注入后
<CodeBlock code="***" />
```

### <a id="点击直达源码">点击直达源码</a>

这个功能和获取源代码差不多，获取源码前会获取到路径，将路径注入到另一个 src 属性即可。拿到 src 属性拼接 Github 地址即可。

### <a id="侧边导航直接跳转">侧边导航直接跳转</a>

这个功能就不需要 viet 插件了，直接遍历 Dom，获取标签中的`a标签中的id` 生成侧边导航。

## <a id="Vite插件实现">Vite 插件实现</a>
