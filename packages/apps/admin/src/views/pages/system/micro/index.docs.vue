<template>
  <DocsLayout>
    <Markdown>
      <pre>
# 微前端
微前端这个饼画了好久，一直没时间推进。回到主题，微前端技术选型博客有很多，如: [2023微前端技术方案选型](https://juejin.cn/post/7236021829000691771)。

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
    <CodeBlock src="@root/packages/apps/micro/src/main.tsx" :default-show-code="true" />
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
    <CodeBlock src="@root/packages/apps/micro/rspack.config.js" :default-show-code="false" />
    <Markdown>
      <pre>
`Nginx`配置子路由转发，主应用放在`/usr/share/nginx/html/`,子应用放在`/usr/share/nginx/html/micro`下：
```
        location /micro {
            if ($request_filename ~* .*\.(?:htm|html)$)  ## 配置页面不缓存html和htm结尾的文件
            {
               add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
            }
            # 把匹配到的路径重写, 注意要以/结尾
            alias /usr/share/nginx/html/micro;
            # 默认首页
            index  index.html;
            try_files $uri $uri/ /micro/index.html;
        }
```
      </pre>
    </Markdown>
    <CodeBlock src="@root/.github/workflows/nginx.conf" :default-show-code="false" />
    <Markdown>
      <pre>
    实现了Github Action配合Dockerfile实现了自动化部署具体可看`/.github/workflows/`
      </pre>
    </Markdown>
  </DocsLayout>
</template>

<script setup lang="ts">
  import MicroAppDemo from './demo/micro-app.demo.vue'
</script>
