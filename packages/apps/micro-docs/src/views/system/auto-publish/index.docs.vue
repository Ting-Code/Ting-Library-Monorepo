<template>
  <DocsLayout>
    <Markdown>
      <pre>
# 🚀CI/CD
CI/CD（持续集成/持续交付）
- **持续集成**：自动触发构建和测试
- **持续交付**：通过自动化流水线将代码部署到各类环境
CI/CD不仅是自动打包自动部署，还包含自动测试、代码检查等等环节。

## CI/CD工具选型
CI/CD工具有很多，比如Jenkins、GitLab CI/CD、GitHub Actions等。有些工具需要自己准备服务器安装，有些工具可以直接可以运行在云端。
### Jenkins
  **优点**
  - 完全开源免费，超2000个插件生态系统
  - 支持分布式构建
  - 可深度定制流水线

  **缺点**：
  - 需要自行维护服务器
  - 配置复杂度高
  - 界面较为陈旧


### GitLab CI/CD
**优点**
- 与GitLab仓库深度集成（单一数据源）
- 支持Auto DevOps（开箱即用流水线）
- 完善的权限管理（RBAC模型）

**缺点**
- 高级功能需要付费（如多项目流水线）
- 调试体验较差（日志查看不便），社区插件较少

### GitHub Actions
**优点**
- 与GitHub无缝集成（原生支持）
- 按分钟计费的经济模式（公有仓库免费）
- 丰富的官方Action库（即插即用）

**缺点**
- 自定义Runner需要自维护
- 生态系统较新（部分场景支持不足）
      </pre>
    </Markdown>
    <Markdown>
      <pre>
## 单元测试
选用Vitest 作为单元测试框架。
核心优势
- 极速启动 ：比Jest快10倍的测试速度
- 原生ESM支持 ：无需额外配置
- 智能监听 ：只重新运行相关测试
      </pre>
    </Markdown>
    <CodeBlock src="@root/packages/lib/utils/src/date/test/date.test.ts" />
    <Markdown>
      <pre>
## 代码扫描
ESLint + Prettier 代码规范检查
      </pre>
    </Markdown>
    <CodeBlock src="@root/configs/lint/eslint.js" />
    <Markdown>
      <pre>
## 最终方案实践
由于本项目是Github开源项目，所以选择了Github Actions对开源项目免费。配合Docker实现镜像打包与部署。
      </pre>
    </Markdown>
    <CodeBlock src="@root/.github/workflows/docker-deploy.yml" />
    <CodeBlock src="@root/.github/workflows/Dockerfile" />
  </DocsLayout>
</template>

<script setup lang="ts"></script>
