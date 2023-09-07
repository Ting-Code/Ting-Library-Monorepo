<template>
  <div :class="ns.b()">
    <div :class="ns.e('docs')" ref="codeDomRef">
      <slot></slot>
      <div :class="ns.e('bottom')"> </div>
    </div>
    <DocsNavigation :tree="titleTree" />
  </div>
</template>

<script setup lang="ts">
  import 'prismjs'
  import 'prismjs/components/prism-typescript'
  import 'prismjs/components/prism-scss'
  import DocsNavigation from './navigation/index.vue'
  import { highlightAllUnder } from 'prismjs'
  import { nextTick, onMounted, ref } from 'vue'
  import { useNamespace } from '@/hooks/useNamespace'

  defineOptions({
    name: 'DocsLayout'
  })

  const ns = useNamespace('docs-layout')
  const codeDomRef = ref<HTMLElement>()
  type ITitleTree = { tag: string; text: string; id: string }[]
  const titleTree = ref<ITitleTree>([])

  onMounted(() => {
    nextTick(() => {
      if (codeDomRef.value) {
        highlightAllUnder(codeDomRef.value)
        titleTree.value = getCodeDomTree(codeDomRef.value)
      }
    })
  })

  const getCodeDomTree = (node: Element): ITitleTree => {
    const tree: ITitleTree = []
    // 添加<a> 标签和id
    function transformTitle(child: Element): string {
      const id = child?.textContent?.replace(/\s+/g, '-') || ''
      child.setAttribute('id', id)
      return id
    }
    // 遍历dom
    function traverse(node: Element) {
      if (!node.children) return []
      Array.from(node.children).forEach((child) => {
        // 如果子节点是h1~h5标签，则给它插入属性，并把它的信息添加到数组中
        if (child.tagName && child.tagName.match(/^H[1-5]$/)) {
          tree.push({
            tag: child.tagName,
            text: child.textContent || '',
            id: transformTitle(child)
          })
        }
        // 继续遍历子节点的子节点
        traverse(child)
      })
    }
    traverse(node)
    return tree
  }
</script>

<style lang="scss">
  @include b(docs-layout) {
    display: flex;
    flex-direction: row;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    @include e(docs) {
      padding: 30px calc(8% - 18px);
      flex: 1;
      width: 0;
    }

    @include e(bottom) {
      height: 100px;
    }
  }
</style>
