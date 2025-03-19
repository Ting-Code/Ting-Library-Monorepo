<template>
  <DocsLayout>
    <Markdown>
      <pre>
# 微前端
微前端借鉴了后端微服务的架构理念，将不同的功能模块独立化，最终通过统一的基座应用进行整合。每个子应用技术栈没有约束，可独立运行，独立发布。

## 微前端技术选型

简单总结如何选型
* 只需要简单嵌套网页选`iframe`或`模块联邦`
* 需要好的兼容性并且只用`webpack`选择[`QianKun`](https://qiankun.umijs.org/zh)
* 需要支持`Vite`选择[`无界`](https://wujie-micro.github.io/doc/)或者文档更健全的[`Micro-App 1.X`](https://micro-zoe.com/docs/1.x/#/zh-cn/start)

## Micro-App 1.X
最终我选择`Micro-App 1.X`是因为接入简单，最重要的一点是支持`Vite`。注意`Micro-App 0.X`支持`Vite`比较鸡肋，不如`无界`。
      </pre>
    </Markdown>
    <CodeBlock :is="MicroAppDemo" type="html" />
    <Markdown>
      <pre>
### 快速接入
[`Micro-App 1.X`](https://micro-zoe.com/docs/1.x/#/zh-cn/start)
如何接入可看文档，这里主要说下有哪些注意点。

子应用需要加入如下代码来判断是否需要渲染，如果不加的话会出现渲染多次或者不渲染的情况。

      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/apps/micro-demo/src/main.tsx" :default-show-code="true" />
    <Markdown>
      <pre>
高于部署，我选择部署同域名下的子路由/micro/中，需要配置以下。
```typescript
   devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*' // 开发环境跨域
      }
   },
   output: {
      publicPath: isProdMode ? '/micro/' : '/', // 资源放入micro子目录中
   }
```
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/apps/micro-demo/rspack.config.ts" :default-show-code="false" />
    <Markdown>
      <pre>
## 最终Micro-App方案
演示的快速接入虽然简单，但不太满足大部分项目需要，因为默认的路由模式会侵入url参数，给项目带来不确定的风险。

### 路由模式
Micro-App 1.X的[`路由模式`](https://jd-opensource.github.io/micro-app/docs.html#/zh-cn/router)有多种，最终选用的`native`模式。
`native`模式特点主路由和子路由都共享浏览器的url，缺点是会增加一些配置兼容。
1. 创建路由要加上`baseRoute``createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || '/docs/')`
2. 打包配置也要对应加上配置`base: command === 'build' ? '/micro/docs/' : '/docs/'`
3. Nginx发布配置要正确配置代理映射
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/lib/system/src/hooks/micro.ts" :default-show-code="false" />
    <Markdown>
      <pre>
    实现了Github Action配合Dockerfile实现了自动化部署具体可看`/.github/workflows/`
      </pre>
    </Markdown>
    <CodeBlock src="@root/.github/workflows/nginx.conf" :default-show-code="false" />
    <Markdown>
      <pre>
### 应用通信
Micro-App中有完善的主应用和子应用之间的通信方式，具体可看官方文档。
但里使用的是`EventBus`来实现的，通过主应用全局Window传递对应初始化函数，再在每个子应用监听对应事件，实现通信。
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/lib/system/src/global-data/mitt.ts" />
    <Markdown>
      <pre>
### CSS隔离
Micro-App中具备完善的 CSS 隔离机制，这有助于防止不同微应用之间的样式相互干扰。下面为你详细介绍 Micro-App 里的 CSS 隔离相关内容。
这里适用命名空间区别于各个子应用，即避免各个子应用样式冲突，也可以灵活调整样式。
        具体可看[CSS架构中的namespace](/docs/system/css)
      </pre>
    </Markdown>
  </DocsLayout>
</template>

<script setup lang="ts">
  import MicroAppDemo from './demo/micro-app.demo.vue'
</script>
