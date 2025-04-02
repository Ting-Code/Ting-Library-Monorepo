<template>
  <DocsLayout>
    <Index />
    <CodeBlock src="@root/packages/lib/vue/src/components/virtual-scroll/index.vue" type="html" />
    <Markdown>
      <pre>
### 固定高度虚拟列表
      </pre>
    </Markdown>
    <CodeBlock :is="FixationHeight" type="html" />
    <Markdown>
      <pre>
### 动态高度虚拟列表
动态高度虚拟列表可通过成熟的插件实现
```
pnpm add vue-virtual-scroller@next
```

```javascript
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
```
      </pre>
    </Markdown>
    <CodeBlock :is="DynamicHeight" type="html" />
  </DocsLayout>
</template>

<script setup lang="ts">
  import Index from './index.md'
  import FixationHeight from './demo/fixation-height.demo.vue'
  import DynamicHeight from './demo/dynamic-height.demo.vue'
</script>
