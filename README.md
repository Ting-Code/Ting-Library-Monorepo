# <a id="ting">Ting Library 介绍</a>

<p align="center">
<img src="https://img.shields.io/badge/pnpm-8.0+-brown.svg" alt="pnpm" />
<img src="https://img.shields.io/badge/Vue-3.3+-green.svg" alt="Vite"  /> 
<img src="https://img.shields.io/badge/Vite-4.3+-violet.svg" alt="Vite" />
</p>
<p align="center">
<img src="https://img.shields.io/badge/Rspack-0.2+-red.svg" alt="pnpm" />
<img src="https://img.shields.io/badge/React-18+-midnightblue.svg" alt="React"  /> 
<img src="https://img.shields.io/badge/MicroApp-13+-cyan.svg" alt="MicroApp" />
<img src="https://img.shields.io/badge/Nextjs-13+-black.svg" alt="Nextjs" />
</p>

Ting Library：文档既架构的知识库。由于博客的文字单薄性，所以打造了一款源码与文档结合的知识库。既能看文档梳理的思路，又能直达源码深入探究。

Ting Library 是基于 pnpm 搭建的 monorepo 架构文档既架构的知识库。 主要用于归纳前端生态的解决方案与最佳实践。 基于 Vue3 为主应用，结合 MicroApp 微前端。后期添加 React、Nextjs 等子应用。 希望各位小伙伴一起讨论总结，一起进步。

## 快速开始

```
git clone https://github.com/Ting-Code/Ting-Library-Monorepo.git
pnpm install
# 启动选择项目
pnpm dev
# 或者直接启动admin项目
pnpm --filter @apps/element-admin dev
```

## 目录结构

## 版本进度

| 类型 | 内容                         | 完成情况 | 版本实现 |
| ---- | ---------------------------- | -------- | -------- |
| 架构 | 基于 pnpm 构建 monorepo      | ✅       | v0.1.0   |
| 架构 | Vite 搭建 Vue3 主应用        | ✅       | v0.1.0   |
| 架构 | Rspack 搭建 React 子应用     | ✅       | v0.1.0   |
| 系统 | 知识库主体                   | ✅       | v0.1.0   |
| 系统 | 主题切换                     | ✅       | v0.1.0   |
| 架构 | 实现主页布局                 | ✅       | v0.1.0   |
| 系统 | 适配移动端                   | ✅       | v0.1.0   |
| 架构 | Github Actincs 自动化部署    | ✅       | v0.1.0   |
| 功能 | 自定义 vite 插件注入展示源码 | ✅       | v0.2.0   |
| 页面 | 介绍页                       | ✅       | v0.2.0   |
| 页面 | 文档设计                     | ✅       | v0.2.0   |
| 架构 | MicroApp 构建微前端          | ⬜️      | v0.3.0   |
