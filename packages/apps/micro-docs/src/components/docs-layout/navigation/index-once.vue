<template>
  <div :class="ns.b()">
    <div v-if="isMobile" :class="ns.e('icon-tree')">
      <div :class="ns.em('icon-tree', 'icon')" @click="toggleDrawerTree">
        <Icon icon="layout-set" size="20" />
      </div>
    </div>
    <div :class="ns.e('substitute')" v-else>
      <div ref="treeDomRef" :class="ns.em('substitute', 'absolute-tree')">
        <DocsTree :tree="props.tree || []" />
      </div>
    </div>
  </div>

  <el-drawer v-model="drawerTree" :with-header="false" size="260">
    <div style="padding-top: 50px">
      <DocsTree :tree="props.tree || []" />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
  import DocsTree from './tree-once.vue'
  import { nextTick, ref, toRefs, watch } from 'vue'
  import { Icon } from '@tingcode/lib-vue'
  import { useNamespace } from '@tingcode/system'
  import { useAppProviderContext } from '@/application/useAppContext'

  defineOptions({
    name: 'DocsNavigation'
  })

  const props = defineProps<{
    tree?: { tag: string; text: string; id: string }[] | undefined
  }>()

  const { isMobile } = toRefs(useAppProviderContext())

  const ns = useNamespace('docs-navigation')

  const treeDomRef = ref<HTMLDivElement>()
  const treeDomWidth = ref(0)
  const drawerTree = ref(false)

  watch(props, () => {
    nextTick(() => {
      if (treeDomRef?.value?.getBoundingClientRect()?.width) {
        treeDomWidth.value = treeDomRef?.value?.getBoundingClientRect()?.width + 60
      }
    })
  })

  const toggleDrawerTree = () => {
    drawerTree.value = !drawerTree.value
  }
</script>

<style lang="scss">
  @include b(docs-navigation) {
    position: relative;
    padding-top: 50px;

    @include e(icon-tree) {
      position: relative;

      @include m(icon) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        position: fixed;
        right: 6vw;
        border-radius: 50%;
        background: rgba(168, 168, 168, 0.3);
      }
    }

    @include e(substitute) {
      position: relative;
      width: calc(230px + 6vw);

      @include m(absolute-tree) {
        position: fixed;
        padding: 6px 0 8px 18px;
        border-left: 1px solid getCssVar('text-color', 'primary');
      }
    }
  }
</style>
