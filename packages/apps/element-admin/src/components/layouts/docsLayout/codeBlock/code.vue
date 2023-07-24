<template>
  <div :class="ns.b()">
    <!--  eslint-disable vue/no-v-html  -->
    <div :class="ns.e('code')" :style="{ height: `${isShowCode ? height : 0}px` }">
      <pre v-html="code" ref="codeDom"></pre>
    </div>
    <div :class="ns.e('button')" @click="toggleIsShowCode">
      <el-icon>
        <ArrowUpBold v-if="isShowCode" />
        <ArrowDownBold v-else />
      </el-icon>
      <span>{{ isShowCode ? '隐藏代码' : '显示代码' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue'
  import { languages, highlight } from 'prismjs'
  import { computed, defineOptions, nextTick, onMounted, ref, watch } from 'vue'
  import { defineProps } from 'vue'
  import { useNamespace } from '@/hooks/useNamespace'
  defineOptions({
    name: 'CodeBlockCode'
  })

  const props = withDefaults(
    defineProps<{
      code?: string
      type?: 'html' | 'css' | 'javascript' | 'typescript' | 'ts' | 'js' | 'scss'
      defaultShowCode?: boolean
    }>(),
    {
      type: 'typescript',
      defaultShowCode: true
    }
  )
  const codeDom = ref<HTMLDivElement>()
  const height = ref(0)
  const isShowCode = ref(props.defaultShowCode)
  const ns = useNamespace('code-block-code')

  const toggleIsShowCode = () => {
    isShowCode.value = !isShowCode.value
  }

  const code = computed(() => {
    if (props?.code) {
      return highlight(props?.code || '', languages?.[props?.type], props?.type)
    }
    return ''
  })

  watch(code, () => {
    nextTick(() => {
      if (codeDom?.value?.getBoundingClientRect()?.height) {
        height.value = codeDom?.value?.getBoundingClientRect()?.height + 36
      }
    })
  })
  onMounted(() => {
    nextTick(() => {
      if (codeDom?.value?.getBoundingClientRect()?.height) {
        height.value = codeDom?.value?.getBoundingClientRect()?.height + 36
      }
    })
  })
</script>

<style lang="scss">
  @include b(code-block-code) {
    @include e(code) {
      overflow-x: auto;
      overflow-y: hidden;
      transition: height 0.25s;

      > pre {
        padding: 0 calc(2vw);
        font-size: 13px;
        font-family: Menlo, Monaco, Consolas, 'Andale Mono', 'Ubuntu Mono', 'Courier New', monospace;
      }
      &.isUnShowCode {
        height: 0;
      }
    }
    @include e(button) {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      border-top: 1px solid getCssVar(border-color);
      > span {
        padding: 0 8px;
      }
      &:hover {
        background-color: getCssVar(bg-color, main);
      }
    }
  }
</style>
