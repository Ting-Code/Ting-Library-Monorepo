# 📋Nodejs基础

## Node简介

Node.js是一个事件驱动的、非阻塞式的、单线程、异步的I/O的JavaScript运行环境。

- 单线程的最大好处是
  - 不用像多线程编程那样处处考虑状态同步问题
  - 没有死锁的存在
  - 也没有上下线程交换带来的性能开销
- 单线程缺点
  - 无法利用多核CPU
  - 错误会引起整个应用退出，应用健壮性重大考验
  - 大量计算占用CPU导致无法调用异步I/O

### Node应用

- I/O密集型
- 不擅长CPU密集型
  - 但V8执行效率还是比较高的
  - 主要原因单线程，不适合长时间运算，可以分解为小任务充分利用CPU
  - 通过子线程方式将计算与I/O分离
- 分布式应用，中间层应用

### 实际应用场景

- socket.io实现实时通知功能
- 分布式中间层
- 云计算平台托管服务
- 游戏开发领域：网易pomelo实时框架
- 前端工具

## Node.js的技术架构

- V8引擎
- libuv
- C/C++实现的c-ares、http-parser、OpemSSL、zlib等库

|  |  | Node.js API (http模块、fs模块、stream模块)等 |  |  |
| --- | --- | :-: | --- | --- |
|  | Node.js bindings (让js与C/C++通信) |  | C/C++插件 (自定义其他能力) |  |
| js引擎V8 | 跨平台的异步I/O通信能力libuv | DNS解析c-ares | 加密解密OpenSSL | 其他zlib等库 |

### bindings

背景：C/C++实现一个http_parser库很高效，但是只会写JS。所以bindings当JS与C/C++的桥梁。

- Node.js用C++对http_parser进行封装，封装文件叫http_parser_bindings.cpp
- Node.js提供编译工具编译为.node文件
- 这样就可以JS调用C++库，Node.js提供很多binding，所以+s。就是bindings

JS调用C++

官方示例：[http://nodejs.cn/api/addons.html#addons_function_arguments](http://nodejs.cn/api/addons.html#addons_function_arguments)

C++调用JS回调

官方示例：[http://nodejs.cn/api/addons.html#addons_callbacks](http://nodejs.cn/api/addons.html#addons_callbacks)

### V8引擎

功能：

- 将JS源代码变成本地代码并执行
- 维护调用栈，确保JS函数的执行顺序
- 内存管理，为手游对象分配内存
- 垃圾回收，重复利用无用的内存
- 实现JS的标准库

注意点：

- V8不提供DOM API
- V8执行JS是单线程
- 可以开启两个线程分别不同JS
- V8是多线程的：如垃圾回收为单独线程
- 自带event loop 但Node.js基于libuv自己做了一个

### libuv跨平台

背景：

- FreeBSD系统有kqueue、Linux系统上有epoll、Windows系统有IOCP的异步I/O库
- Ryan（作者）为了实现跨平台的异步I/O库，开始写libuv
- libuv会根据系统自动选择合适的方案

功能：

- 用于TCP/UDP/DNS文件的异步操作
- Node的第三方C++模块可以借助libuv实现跨平台

### Event Loop

什么是Event

- 内部的计算器到期了事件
- 外部的文件可以读取、读取出错事件
- socket有内容了、关闭了告诉事件

什么是Loop

- loop就是循环
- 事件有优先级的所以处理起来也是分先后的
- Node.js需要顺序论询每种事件，所以往往是循环的

Event Loop

- 操作系统可以触发事件，js可以处理事件
- Event Loop就是对事件处理的顺序管理

顺序示意图翻译：[https://juejin.im/post/6844903582538399752](https://juejin.im/post/6844903582538399752)

```javascript
   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘

```

重点阶段

- timers阶段：检查计时器
- poll轮询阶段：当轮询没事情处理后会停止在poll阶段
- check检查setlmmediate回调

注意：大部分事件停在poll，文件、网络请求都在poll阶段

### Node.js API

英文文档：[https://nodejs.org/api/](https://nodejs.org/api/)

中文文档：[http://nodejs.cn/api/](http://nodejs.cn/api/)

- [assert（断言）](http://nodejs.cn/api/assert.html#assert_assert)
- [Buffer（缓冲器）](http://nodejs.cn/api/buffer.html#buffer_buffer)
- [child_process（子进程）](http://nodejs.cn/api/child_process.html#child_process_child_process)
- [cluster（集群）](http://nodejs.cn/api/cluster.html#cluster_cluster)
- [debugger（调试器）](http://nodejs.cn/api/debugger.html#debugger_debugger)
- [events（事件触发器）](http://nodejs.cn/api/events.html#events_events)
- [fs（文件系统）](http://nodejs.cn/api/fs.html#fs_file_system)
- [global（全局变量）](http://nodejs.cn/api/globals.html#globals_global_objects)
- [http（HTTP）](http://nodejs.cn/api/http.html#http_http)
- [path（路径）](http://nodejs.cn/api/path.html#path_path)
- [querystring（查询字符串）](http://nodejs.cn/api/querystring.html#querystring_query_string)
- [stream（流）](http://nodejs.cn/api/stream.html#stream_stream)
- [timer（定时器）](http://nodejs.cn/api/timers.html#timers_timers)
- [url（URL）](http://nodejs.cn/api/url.html#url_url)
- [worker_threads（工作线程）](http://nodejs.cn/api/worker_threads.html#worker_threads_worker_threads)
