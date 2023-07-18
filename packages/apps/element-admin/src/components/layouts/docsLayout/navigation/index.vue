<template>
  <div :class="ns.b()">
    <div :class="ns.e('substitute')" :style="{ width: `${treeDomWidth}px` }">
      <div ref="treeDomRef" :class="ns.em('substitute', 'absolute-tree')">
        <DocsTree :tree="props.tree || []" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import DocsTree from './tree.vue'
  import { defineOptions, defineProps, nextTick, ref, watch } from 'vue'
  import { useNamespace } from '@/hooks/useNamespace'

  defineOptions({
    name: 'DocsNavigation'
  })

  const props = defineProps<{
    tree?: { tag: string; text: string; id: string }[] | undefined
  }>()

  const ns = useNamespace('docs-navigation')

  const treeDomRef = ref<HTMLDivElement>()
  const treeDomWidth = ref(0)

  watch(props, () => {
    nextTick(() => {
      if (treeDomRef?.value?.getBoundingClientRect()?.width) {
        treeDomWidth.value = treeDomRef?.value?.getBoundingClientRect()?.width
        console.log(treeDomWidth.value)
      }
    })
  })
</script>

<style lang="scss">
  @include b(docs-navigation) {
    position: relative;

    @include e(substitute) {
      position: relative;

      @include m(absolute-tree) {
        position: absolute;
      }
    }
  }
</style>
