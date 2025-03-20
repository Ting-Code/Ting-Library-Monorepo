<template>
  <DocsLayout>
    <Markdown>
      <pre>
# 🛠️工程化设计
Ting-Library-Monorepo 采用了 Monorepo（单仓库多项目）架构，将多个相关的项目集中在一个代码仓库中进行管理。这种架构的优点在于方便代码共享、版本管理和依赖管理，同时也便于团队协作开发。项目主要包含了多个应用包（如 micro-docs 和 admin ），每个应用包都有其独立的功能和职责。
- Monorepo（单仓库多项目）架构
- 微前端
- CLI 工具
- 独立库
- 自动化发布CI/CD

## Monorepo架构
**为什么选择Monorepo架构**
-  **代码共享**：在 Monorepo 中，各个项目可以方便地共享代码与本地调试，避免代码重复。使得团队成员可以在同一个代码仓库中工作，便于进行代码审查、协作开发和问题跟踪。
-  **版本管理**：所有项目的版本都在同一个仓库中管理，便于进行版本控制和回溯。可以轻松地查看和管理每个项目的版本历史，确保版本的一致性。
-  **依赖管理**：通过统一的 `package.json` 文件和工作空间配置，可以更好地管理项目的依赖。避免了不同项目之间依赖冲突的问题，提高了依赖管理的效率。

**Monorepo架构选型**
在选择 Monorepo 架构时，有几种常见的工具可供考虑，以下是一些主流工具及其特点：
- **Lerna** 较早出现且广泛使用的 Monorepo 管理工具，它提供了诸如版本管理、发布管理等基础功能。可以批量版本更新和发布，支持固定模式（Fixed/Locked mode）和独立模式（Independent mode）。但是版本3.0之后，Lerna原来成员不再维护，不再提供新的功能。
- **Turborepo** 由 Vercel 团队开发，它提供了更快的构建速度和更好的缓存机制。采用了增量构建的策略，只重新构建受影响的项目，从而提高了构建速度。但是Turborepo的生态系统相对较小，相关生态不成熟。
- **pnpm** 是一个快速、高效的包管理器，它支持 Monorepo 架构。它使用了扁平化的依赖结构，避免了重复安装和依赖冲突。同时，pnpm 支持并行安装和构建，提高了构建速度

综上所述，pnpm 在依赖管理、性能表现、生态系统和易用性等方面都具有明显的优势，因此被选择作为 Monorepo 架构的工具。
### pnpm
具体搭建可看[pnpm文档](https://pnpm.io/zh/)
      </pre>
    </Markdown>
    <CodeBlock src="@root/pnpm-workspace.yaml" />
    <Markdown>
      <pre>
## 微前端
[🧩微前端](/docs/system/micro)

## CLI 工具
- commander：这是一个 Node.js 库，用于创建命令行接口（CLI），它能让你轻松地定义命令、选项和参数，并且解析用户输入。
- inquirer：同样是 Node.js 库，用于创建交互式命令行界面，它提供了多种交互方式，像询问问题、选择列表、输入文本等。
- execa：这是一个跨平台的 Node.js 库，用于在 Node.js 中执行外部命令。它提供了一种简单的方式来执行命令，并且可以处理命令的输出和错误。
- unbuild：一个基于 Rollup 的现代 JavaScript 项目构建工具，专为构建库和 CLI 工具设计。它提供了简单的配置和快速的构建速度，支持 TypeScript、ESNext 等特性，并且可以自动生成 CommonJS 和 ESM 格式的输出文件。
- esno： 一个 TypeScript 和 ESM 的直接执行器，允许你直接在 Node.js 环境中运行 TypeScript 文件，而无需先进行编译。它基于 esbuild 进行快速编译，提供了与 Node.js 相同的执行环境，方便开发和调试。

基于以上工具，我们可以通过组合使用这些库来创建一个功能强大的 CLI 工具，用于管理和构建项目。

### 创建模板CLI
```
pnpm create tingcli
```
由于需要发布npm包，需要使用`unbuild`打包，在开发时可用`esno`调试执行。
```
"dev": "esno ./src/cli.ts",
"start": "node ./bin/index.mjs",
"build": "unbuild",
"test": "vitest",
```
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/cli/create/src/cli.ts" />
    <Markdown>
      <pre>
### 辅助执行工具
由于使用Monorepo架构，存在多个子应用和子包，需要在执行命令时切换到对应的子应用或子包目录下。  
通过辅助执行工具可快速启动或构建子应用或子包。
      </pre>
    </Markdown>
    <CodeBlock src="@root/scripts/dev.ts" />
    <Markdown>
      <pre>
## 独立库
### 工具库
`@ting/utils`将常用的工具函数统一封装成独立的库，方便复用。并且添加了单元测试，提高了代码质量。
- 使用Vitest进行单元测试
- unbuild打包
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/lib/utils/src/index.ts" />
    <Markdown>
      <pre>
### 系统库
`@tingcode/utils`是与业务解耦的函数库，提供了一些常用的工具函数。  
`@tingcode/system`是结合业务的系统库，提供了系统级别复用的工具，给各个子应用复用。
- 请求库二次封装
- 微前端通信封装
- 权限管理封装
- 系统设置相关函数
- 用户信息处理函数
- ENV变量处理函数
- 系统namespace管理
- 使用Vitest进行单元测试
- unbuild打包
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/lib/system/src/index.ts" />
    <Markdown>
      <pre>
### 组件库
`@tingcode/lib-vue` 是一个 Vue 3 组件库与框架耦合，提供了一些常用的组件以及二次封装的组件。
- Vue3组件封装
- ElementPlus组件二次封装
- Hooks封装
- 使用Vitest进行单元测试
- Vite库模式打包
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/lib/vue/vite.config.ts" />
    <Markdown>
      <pre>
## 自动化发布CI/CD
自动化发布是指借助脚本或者工具，自动完成代码构建、测试、打包以及部署等一系列操作。这样可以提高发布效率，减少人为错误。
- GitHub Actions ：GitHub 提供的自动化工具，可依据代码仓库的事件（如 push、pull request 等）触发工作流。
- GitLab CI/CD ：GitLab 内置的持续集成和持续部署工具，能实现自动化构建、测试和部署。
- Jenkins ：一款开源的自动化服务器，支持多种插件，可实现复杂的自动化流程。  
作为一个开源项目最佳选择必然是`GitHub Actions`，本系统结合`Docker`实现自动化发布到云服务器。  
具体可看.github/workflows
      </pre>
    </Markdown>
    <CodeBlock src="@root/.github/workflows/docker-deploy.yml" />
    <CodeBlock src="@root/.github/workflows/Dockerfile" />
  </DocsLayout>
</template>

<script setup lang="ts"></script>
