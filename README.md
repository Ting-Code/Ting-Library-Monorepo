# <a id="ting">📖Ting Library 介绍</a>

<div align="center" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin: 15px 0;">
  <img src="https://img.shields.io/badge/pnpm-10.0+-brown.svg" alt="pnpm" style="height: 24px;" />
  <img src="https://img.shields.io/badge/MicroApp-1.0+-cyan.svg" alt="MicroApp" style="height: 24px;" />
  <img src="https://img.shields.io/badge/TypeScript-5.0+-blue.svg" alt="TypeScript" style="height: 24px;" />
</div>
<div align="center" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin: 15px 0;">
  <img src="https://img.shields.io/badge/Rspack-1.0+-red.svg" alt="Rspack" style="height: 24px;" />
  <img src="https://img.shields.io/badge/React-18+-midnightblue.svg" alt="React" style="height: 24px;" />
  <img src="https://img.shields.io/badge/Nextjs-15+-black.svg" alt="Nextjs" style="height: 24px;" />
</div>
<div align="center" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin: 15px 0;">
  <img src="https://img.shields.io/badge/Vite-6.0+-violet.svg" alt="Vite" style="height: 24px;" />
  <img src="https://img.shields.io/badge/Vue-3.5+-green.svg" alt="Vue" style="height: 24px;" />
  <img src="https://img.shields.io/badge/VueUse-13.0+-orange.svg" alt="VueUse" style="height: 24px;" />
</div>

Ting Library：基于 pnpm 搭建的 monorepo 架构的知识库。架构与文档于一体的知识库，沉淀各种解决方案并直达源码的直观文档。

Ting Library 目前实现基于 MicroApp 搭建微前端, rspack搭建React、Vite搭建Vue3 等子应用,独立的共享库、工具库、vue组件库，集成前端各种解决方案以及可直达源码的文档设计。并实现了Github Action 自动化打包与部署Docker镜像。

## 快速开始

```bash
# 执行tingcli （必须是最新版pnpm）
pnpm create tingcli

# 选择monorepo
  cli
❯ monorepo

# 输入项目名
? 项目类型 monorepo
? 项目名称 project-name

# 初始化项目 （必须是最新版pnpm）
pnpm install
```

### 启动项目

```bash
# 启动项目 (单选)
pnpm dev

? 请选择需要执行的项目 » - 上下选择，空格切换，回车确定
>   @apps/admin
    @apps/micro
    ...

# 构建 （多选）
pnpm build

? 请选择需要执行的项目 » - 上下选择，空格切换，回车确定
Instructions:
    ↑/↓: Highlight option
    ←/→/[space]: Toggle selection
    a: Toggle all
    enter/return: Complete answer
( )   @apps/admin
( )   @apps/micro
( )   @tingcli/create
( )   @tingcli/cli-utils
( )   @tingcode/lib-vue
( )   vite-plugin-code
      ...
```

### 如果无法启动可以尝试

```
# 允许下载依赖
pnpm approve-builds

# 全部选择
  ● @parcel/watcher
  ● esbuild
❯ ● vue-demi

# 输入y
Do you approve? (y/N) · true
```

## 目录结构

```

Ting-Library-Monorepo
├─.changeset
├─.github  # github action
|    ├─workflows
|    |     ├─docker-deploy.yml # github action 自动化脚本
|    |     ├─dockerBootstrap.sh # 服务端脚本
|    |     ├─Dockerfile # 通过Dockerfile构建image
|    |     └nginx.conf # nginx配置
├─.husky # git钩子 主要是commit lint
├─configs
|    ├─tsconfig
|    └─lint # 各种lint相关配置
├─packages
|    ├─apps
|    |  ├─admin # Vite搭建vue3主应用
|    |  ├─micro-docs # Vite 搭建Docs文档子应用
|    |  ├─micro-demo # Rspack 搭建React子应用
|    |  ├─micro-modeling # Vite搭建3D建模子应用
|    |  ├─ssr # Nextjs服务端渲染应用
|    |  └─uni-app # UniApp搭建跨平台应用
|    ├─cli # 自定义脚手架cli
|    |  ├─utils
|    |  ├─template # cli模板
|    |  └─create # 创建模板cli
|    ├─lib
|    |  ├─request # 请求相关封装
|    |  ├─system # 微前端共享库
|    |  ├─utils # 工具函数库
|    |  ├─vue # vue组件库
|    |  └─vite-plugin-code # docs文档生成插件
└─scripts # 构建脚本

```

## 版本进度

- 架构 - 基于 pnpm 构建 monorepo v0.1.0 ✅
- 架构 - Github Actions 自动化部署 v0.1.0 ✅
- 架构 - MicroApp 构建微前端 v0.2.0 ✅
- 架构 - Rspack 搭建 React 子应用 v0.1.0 ✅
- 架构 - Vite 搭建 Vue3 主应用 v0.1.0 ✅
- 架构 - Vite 搭建 Vue3 子应用 v0.3.0 ✅
- 架构 - vue独立组件库 v0.3.0 ✅
- 架构 - 抽离Docs为独立子应用 v0.3.0 ✅
- 架构 - 与业务耦合的System共享包 v0.3.0 ✅

  - 系统 - 知识库主体 v0.1.0 ✅
  - 系统 - 主题切换 v0.1.0 ✅
  - 系统 - 实现主页布局 v0.1.0 ✅
  - 系统 - 适配移动端 v0.1.0 ✅
  - 插件 - 自定义 vite 插件注入展示源码 v0.2.0 ✅

- 页面 - 首页 v0.1.0 ✅
- 导航 - 架构设计 v0.1.0 ✅
  - 页面 - 📖Ting Library 介绍 v0.2.0 ✅
  - 页面 - 🛠️工程化设计 v0.2.0 ✅
  - 页面 - 📝文档的设计 v0.2.0 ✅
  - 页面 - 🧩微前端 v0.2.0 ✅
  - 页面 - 🎨CSS架构设计 v0.3.0 ✅
  - 页面 - 🚀CI/CD v0.3.0 ✅
  - 页面 - ❗404页面 v0.1.0 ✅
- 导航 - 基础知识 v0.3.0 ✅
  - 页面 - 📋Git基础 v0.3.0 ✅
  - 页面 - 📋Nodejs基础 v0.3.0 ✅
  - 页面 - 📋Docker基础 v0.3.0 ✅
  - 页面 - 📋Linux基础 v0.3.0 ✅
  - 页面 - 📋计算机网络基础 v0.3.0 ✅
- 导航 - 性能优化 v0.3.0 ✅
  - 页面 - ⚡性能优化综述 v0.3.0 ✅
  - 页面 - 📜虚拟列表 v0.3.0 ✅
- 导航 组件封装 v0.2.0 ✅
  - 页面 - 🛠️二次封装组件 v0.2.0 ✅
  - 页面 - 🧱低代码 v1.0.0 ✅
- 导航 - 可视化 v0.3.0 ✅
  - 页面 - 🗺️流程图 v0.3.0 ✅
  - 页面 - 📊数据图表 v0.3.0 ✅
  - 页面 - 🎞️动画 v0.3.0 ✅
  - 页面 - 🎮2D物理引擎 v1.0.0 ✅
  - 页面 - 🗿3D模型 v1.0.0 ✅

## 贡献人员

<a href="https://github.com/Ting-Code/Ting-Library-Monorepo">
  <img src="https://contrib.rocks/image?repo=Ting-Code/Ting-Library-Monorepo" />
</a>

### 游客打卡点

<a href="https://ting-code.github.io/Ting-Punch-Tag/index.html">
  <img src="https://contrib.rocks/image?repo=Ting-Code/tag" />
</a>
