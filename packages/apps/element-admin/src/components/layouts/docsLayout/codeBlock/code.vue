<template>
  <div :class="ns.b()">
    <!--  eslint-disable vue/no-v-html  -->
    <div :class="ns.e('code')" :style="{ height: `${isShowCode ? height : 0}px` }">
      <pre v-html="code" ref="codeDom"></pre>
    </div>
    <div :class="ns.e('button')" @click="toggleIsShowCode">
      <el-icon>
        <component :is="EPIcon[`${isShowCode ? 'ArrowUpBold' : 'ArrowDownBold'}`]" />
      </el-icon>
      <span>{{ isShowCode ? '隐藏代码' : '显示代码' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { EPIcon } from '@/main'
  import { languages, highlight } from 'prismjs'
  import { computed, defineOptions, nextTick, ref, watch } from 'vue'
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

  const code = computed(() => highlight(props?.code || '', languages[props.type], props.type))

  watch(code, () => {
    nextTick(() => {
      if (codeDom?.value?.getBoundingClientRect()?.height) {
        height.value = codeDom?.value?.getBoundingClientRect()?.height + 36
      }
    })
  })
  nextTick(() => {
    if (codeDom?.value?.getBoundingClientRect()?.height) {
      height.value = codeDom?.value?.getBoundingClientRect()?.height + 36
    }
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
