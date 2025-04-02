# ⚡性能优化综述

## 网络性能优化

### CDN 加速

使用内容分发网络（CDN）加速静态资源的分发。CDN 节点分布在全球各地，用户可以从离自己最近的节点下载静态资源，减少网络延迟。

### 优化 DNS 查询

减少 DNS 查询次数，使用 DNS 预解析技术，提前解析域名，减少 DNS 查询的时间。

## HTTP优化

### 缓存策略

HTTP 缓存是一种机制，用于减少对服务器的请求，提高网站性能和响应速度，降低服务器负载。它主要分为强缓存和协商缓存。

### **强缓存**

通过响应头中的 Expires 和 Cache-Control 字段来控制。浏览器直接从本地缓存中读取资源，无需向服务器发送请求。

- Expires ：这是 HTTP/1.0 中的字段，它的值是一个具体的时间（GMT 格式），表示资源的过期时间。例如：

```plaintext
Expires: Thu, 31 Dec 2025 23:59:59 GMT
```

不过，由于它依赖于客户端和服务器的时间同步，存在一定的局限性，现在一般使用 Cache-Control 替代。

- Cache-Control ：这是 HTTP/1.1 中的字段，有多种取值，常见的有：
  - max-age ：指定资源的缓存时间（秒），例如 Cache-Control: max-age=3600 表示资源在 1 小时内有效。
  - public ：表示资源可以被所有缓存（包括代理服务器）缓存。
  - private ：表示资源只能被客户端缓存。
  - no-cache ：表示需要先与服务器验证资源是否有更新，再决定是否使用缓存。
  - no-store ：表示禁止使用任何缓存。

### **协商缓存**

当强缓存失效时，浏览器会向服务器发送请求，验证资源是否有更新。协商缓存通过 ETag 和 Last-Modified 字段来控制。

- Last-Modified ：服务器返回资源时，在响应头中添加 Last-Modified 字段，表示资源的最后修改时间。浏览器下次请求时，会在请求头中添加 If-Modified-Since 字段，值为上次响应的 Last-Modified 时间。服务器比较这个时间和资源的实际修改时间，如果没有变化，则返回 304 状态码，浏览器使用本地缓存。例如：

```plaintext
Last-Modified: Mon, 15 Apr 2024 12:00:00 GMT
```

请求头：

```plaintext
If-Modified-Since: Mon, 15 Apr 2024 12:00:00 GMT
```

- ETag ： ETag 是资源的唯一标识符，服务器根据资源内容生成一个哈希值。浏览器下次请求时，会在请求头中添加 If-None-Match 字段，值为上次响应的 ETag 。服务器比较这个值和当前资源的 ETag ，如果相同，则返回 304 状态码。例如：

```plaintext
ETag: "123456789abcdef"
```

请求头：

```plaintext
If-None-Match: "123456789abcdef"
```

ETag 比 Last-Modified 更精确，因为它可以检测到文件内容的微小变化，而 Last-Modified 只能检测到文件的修改时间。

### 缓存策略最佳实践

- 哈希指纹文件（强缓存）：为资源文件添加哈希指纹，例如 main.abc123.js ，当文件内容发生变化时，哈希值也会改变。这样浏览器就会认为文件已经更新，需要重新请求。
- 首页文件（不缓存）： 为了避免缓存问题，可以在请求头中添加 no-cache 字段，理论上可以添加协商缓存监测入口文件是否变化再更新缓存，但实践中有些设备无法准确更新文件，所以强制浏览器每次请求都向服务器验证资源是否有更新。

```plaintext
location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;

    # default cache control
    add_header Cache-Control max-age=3600;

    add_header X-Frame-Options DENY;
    # add_header 'Access-Control-Allow-Origin' '*';
    # add_header 'access-control-expose-headers' '*';

    # index.html no-cache
    if ($request_filename ~ .*\.(htm|html|json)$)
    {
        add_header Cache-Control no-cache;
        add_header Pragma no-cache;
    }
}
```

### HTTP2.0

HTTP/2.0 是 HTTP 协议的下一代版本，它引入了多路复用和头部压缩等特性，旨在提高网络性能和用户体验。

- 多路复用： HTTP/2.0 支持同时发送多个请求和响应，而不需要等待一个请求完成再发送下一个请求。这可以减少延迟，提高并发性能。
- 头部压缩： HTTP/2.0 对头部进行了压缩，减少了传输的数据量，提高了传输效率。
- 二进制帧： HTTP/2.0 使用二进制帧来传输数据，而不是文本格式，这使得传输更加高效。
- 服务器推送： HTTP/2.0 支持服务器推送，服务器可以在客户端请求之前发送资源，减少了客户端的等待时间。
- 懒加载预加载： HTTP/2.0 支持懒加载和预加载，这可以减少初始加载时间，提高用户体验。

```html
<!-- preload 预加载，告诉浏览器下一步立即要加载什么资源。 -->
<link rel="preload" href="https://example.com/images/large-background.jpg" />
<!-- prefetch 预加载，告诉浏览器下一步要加载什么资源。在空闲时加载。 -->
<link rel="prefetch" href="https://example.com/images/music.mp3" />
```

HTTP/2.0 引入了多路复用的概念，由于HTTP/1.1 存在队头阻塞问题，导致请求的响应时间变长，所以接下来打包优化中的分包注意HTTP版本。

- HTTP/1.1 队头阻塞：尽量分包以懒加载维度，对同一加载包不进行再分包
- HTTP/2.0 多路复用：同一加载包可以进行再分包，利用多路复用加快加载速度。

## 打包优化

### 代码分割（Code Splitting）

使用 Webpack 或 Vite，将代码分割成多个块，并按需加载，减少初始加载时间。

```javascript
build: {
  outDir: pathResolve('dist'),
  rollupOptions: {
    output: {
      chunkFileNames: 'js/[name]-[hash].js',
      entryFileNames: 'js/[name]-[hash].js',
      assetFileNames: '[ext]/[name]-[hash].[ext]' // 其他文件进入后缀为目录名
    }
  }
}
```

- 分包的Hash策略上面提到HTTP缓存工具hash名的不同来判定是否重新加载服务端资源，所以分包的hash至关重要。  
  构建工具中有三种策略Hash、ContentHash、ChunkHash
  - Hash：每次构建时，整个项目的所有文件的 hash 值都会改变。这意味着，如果项目中的任何文件发生变化，整个项目的 hash 值都会改变。
  - ContentHash：每个文件的 hash 值是根据文件内容计算得出的。如果文件内容没有发生变化，那么文件的 hash 值也不会改变。
  - ChunkHash：每个代码块（chunk）的 hash 值是根据代码以来链条得出，如果该依赖链条发生，那么代码块的 hash 值也会改变。
- 最佳策略
  - 对于JS代码，使用ChunkHash，因为业务代码的内容可能会发生变化。
  - 对于图片、字体等静态资源，使用ContentHash，因为静态资源的内容不会发生变化。

### 懒加载（Lazy Loading）

使用懒加载技术，按需加载组件和资源，减少初始加载时间。打包工具会将懒加载的代码单独打包成一个文件。在需要时再加载。

- js动态导入

```javascript
import('./module.js').then((res) => {
  // 使用模块的导出
  module.default() // 如果模块有默认导出
})
```

- vue 中使用 import 函数实现懒加载。

```javascript
const Home = () => import('./Home.vue')
const About = () => import('./About.vue')
```

- react 中使用 lazy 函数实现懒加载。

```javascript
import { lazy } from 'react'
const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))
```

### 预加载（Preloading）

以上方法都是懒加载，预加载是在页面加载时提前加载资源，减少用户等待时间。

- 手动预加载

```html
<!-- 预加载（当前路由即将需要的关键资源） -->
<link rel="preload" href="URL_ADDRESS.com/large-file.js" />
<!-- 预取（未来可能需要的非关键资源） -->
<link rel="prefetch" href="https://example.com/large-file.js" />
```

- webpack 预加载 webpack v4.6.0+ 增加了对预获取和预加载的支持。在声明import 时，使用下面这些内置指令，来告知浏览器：
  - prefetch(预获取)：将来某些导航下可能需要的资源
  - preload(预加载)：当前导航下可能需要资源

```javascript
// 预加载关键组件（高优先级）
import(/* webpackPreload: true */ './CriticalComponent.js')

// 预取未来可能需要的资源（低优先级）
import(/* webpackPrefetch: true */ './ModalDialog.js')
```

- vite 预加载
  - 自动预加载（Vite默认行为）

```javascript
// 任意动态导入会自动生成 <link rel="modulepreload">
const module = await import('./heavy-module.js')
```

- 插件增强（推荐方案）

```javascript
// vite.config.js
import prefetch from 'vite-plugin-prefetch'
export default defineConfig({
  plugins: [
    prefetch({
      files: ['src/components/**/*.js', 'src/utils/*.js'],
      strategy: 'viewport', // 可视区域内资源预加载
      preload: {
        threshold: 1024, // 1KB以上文件才预加载
        priority: 'high' // 高优先级资源
      }
    })
  ]
})
```

### Tree Shaking

Tree Shaking 是一种去除未使用代码的技术。在 Vite、Webpack等打包工具中，Tree Shaking 是默认开启的。但Cjs 模块不支持Tree Shaking，所以ESM 模块普及非常重要。

- 压缩代码
  - 使用压缩工具，如 UglifyJS、Terser 等，压缩代码，减少文件大小，提高加载速度。
  - 使用压缩工具，如 gzip、brotli 等，压缩文件，减少文件大小，提高加载速度。
  - 使用压缩工具，如 imagemin 等，压缩图片，减少文件大小，提高加载速度。
  - 使用压缩工具，如 cssnano 等，压缩 CSS，减少文件大小，提高加载速度。
  - 使用压缩工具，如 html-minifier 等，压缩 HTML，减少文件大小，提高加载速度。
