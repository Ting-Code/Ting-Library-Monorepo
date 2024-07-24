# <a id="ting">Ting Library 介绍</a>

<p align="center">
<img src="https://img.shields.io/badge/pnpm-8.0+-brown.svg" alt="pnpm" />
<img src="https://img.shields.io/badge/Vue-3.3+-green.svg" alt="Vite"  /> 
<img src="https://img.shields.io/badge/Vite-4.3+-violet.svg" alt="Vite" />
</p>
<p align="center">
<img src="https://img.shields.io/badge/Rspack-0.2+-red.svg" alt="pnpm" />
<img src="https://img.shields.io/badge/React-18+-midnightblue.svg" alt="React"  /> 
<img src="https://img.shields.io/badge/MicroApp-1.0+-cyan.svg" alt="MicroApp" />
<img src="https://img.shields.io/badge/Nextjs-13+-black.svg" alt="Nextjs" />
</p>

Ting Library：文档既架构的知识库。由于博客的文字单薄性，加上语雀开始收费（收费是理解的，但是不靠增值服务收费，而是限制文章开源有点迷，也就是不开会员别人看不到我的文章）。所以打造了一款源码与文档结合的知识库。既能看文档梳理的思路，又能直达源码深入探究。

Ting Library 是基于 pnpm 搭建的 monorepo 架构文档既架构的知识库。 主要用于归纳前端生态的解决方案与最佳实践。 基于 Vue3 为主应用，结合 MicroApp 微前端。后期添加 React、Nextjs 等子应用。 希望各位小伙伴一起讨论总结，一起进步。

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
├─scripts
|    ├─build.ts
|    ├─dev.ts
|    ├─helper.ts
|    └package.json
├─packages
|    ├─apps
|    |  ├─rspack # Rspack 搭建React子应用
|    |  ├─admin # Vite搭建vue3主应用
|    |  |       ├─mock # mock请求
|    |  |       ├─src
|    |  |       |  ├─apis
|    |  |       |  ├─assets
|    |  |       |  ├─components # 自定义组件
|    |  |       |  |     ├─layouts # 布局相关组件
|    |  |       |  |     ├─Icon
|    |  |       |  |     ├─application # 相关全局组件配置
|    |  |       |  ├─styles
|    |  |       |  |   ├─theme # 主题相关
|    |  |       |  |   ├─mixin # scss工具
|    |  |       |  |   ├─base  # 初始化样式
|    |  |       |  ├─store
|    |  |       |  ├─router
|    |  |       |  ├─locale  # i18n国际化
|    |  |       |  ├─hooks
|    |  |       |  ├─directives # 自定义指令
|    ├─utils
|    ├─types
|    ├─request # 请求相关封装
|    |    ├─src
|    |    |  ├─axios # axios 二次封装
|    ├─plugin # 相关自定义插件
|    |   ├─vite
|    |   |  ├─vite-plugin-code
|    |   |  ├─example # 测试示例
|    ├─cli # 自定义脚手架cli
|    |  ├─utils
|    |  ├─template # cli模板
|    |  ├─create # 创建模板cli
├─configs
|    ├─tsconfig
|    ├─lint # 各种lint相关配置
├─.commitlintrc.js
├─.eslintignore
├─.eslintrc.js
├─.gitignore
├─.lintstagedrc.js
├─.npmrc
├─.prettierignore
├─.prettierrc.js
├─.stylelintignore
├─.stylelintrc.js
├─package.json
├─pnpm-lock.yaml
├─pnpm-workspace.yaml
├─README.md
├─turbo.json
```

## 版本进度

- 架构 - 基于 pnpm 构建 monorepo v0.1.0 ✅
- 架构 - Github Actions 自动化部署 v0.1.0 ✅
- 架构 - MicroApp 构建微前端 v0.2.0 ✅
- 架构 - Rspack 搭建 React 子应用 v0.1.0 ✅
- 架构 - Vite 搭建 Vue3 主应用 v0.1.0 ✅

  - 系统 - 知识库主体 v0.1.0 ✅
  - 系统 - 主题切换 v0.1.0 ✅
  - 系统 - 实现主页布局 v0.1.0 ✅
  - 系统 - 适配移动端 v0.1.0 ✅
  - 插件 - 自定义 vite 插件注入展示源码 v0.2.0 ✅

- 页面 - 首页 v0.1.0 ✅
- 导航 - 架构设计 v0.1.0 ✅
  - 页面 - 介绍页 v0.2.0 ✅
  - 页面 - 文档设计 v0.2.0 ✅
  - 页面 - 微前端 v0.2.0 ✅
  - 页面 - 404 页面 v0.1.0 ✅
- 导航 二次封装 v0.2.0 ✅
  - 二次封装技巧 v0.2.0 ✅

## 游客打卡点

<a href="https://ting-code.github.io/tag/index.html">
  <img src="https://contrib.rocks/image?repo=Ting-Code/tag" />
</a>
