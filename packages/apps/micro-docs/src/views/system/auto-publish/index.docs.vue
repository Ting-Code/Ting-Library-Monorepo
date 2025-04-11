<template>
  <DocsLayout>
    <Markdown>
      <pre>
# 🚀CI/CD
CI/CD（持续集成/持续交付）  
- **持续集成**：自动触发构建和测试
- **持续交付**：通过自动化流水线将代码部署到各类环境

## CI/CD步骤分解
CI/CD不仅是自动打包自动部署，还包含自动测试、代码检查等等环节。

### CI/CD工具选型
CI/CD工具有很多，比如Jenkins、GitLab CI/CD、GitHub Actions等。有些工具需要自己准备服务器安装，有些工具可以直接可以运行在云端。
- Jenkins：
**优点**
- 完全开源免费，超2000个插件生态系统
- 支持分布式构建
- 可深度定制流水线

**缺点**：
- 需要自行维护服务器
- 配置复杂度高
- 界面较为陈旧
      </pre>
    </Markdown>
    <CodeBlock :is="MicroAppDemo" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import MicroAppDemo from './demo/micro-app.demo.vue'
</script>
