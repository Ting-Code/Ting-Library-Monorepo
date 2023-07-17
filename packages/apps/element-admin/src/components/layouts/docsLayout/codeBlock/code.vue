<template>
  <div :class="ns.b()">
    <!--  eslint-disable vue/no-v-html  -->
    <div :class="ns.e('code')">
      {{ height }}
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
  import Prism from 'prismjs'
  import { computed, defineOptions, nextTick, onMounted, ref } from 'vue'
  import { defineProps } from 'vue'
  import { useNamespace } from '@/hooks/useNamespace'
  defineOptions({
    name: 'CodeBlockCode'
  })

  const props = defineProps<{
    code?: string
  }>()
  const codeDom = ref<HTMLDivElement>()
  const height = ref(0)
  const isShowCode = ref(true)
  const ns = useNamespace('code-block-code')

  const toggleIsShowCode = () => {
    isShowCode.value = !isShowCode.value
  }

  const code = computed(() => Prism.highlight(props?.code || '', Prism.languages.html, 'html'))

  onMounted(() => {
    nextTick(() => {
      const { height: codeHeight } = codeDom?.value?.getBoundingClientRect() as any
      height.value = codeHeight
      console.log(height.value, '22222222222222222', codeHeight)
    })
  })
</script>

<style lang="scss">
  @include b(code-block-code) {
    @include e(code) {
      overflow-x: auto;
      transition: height 0.25s;

      > pre {
        padding: 8px calc(2vw);
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
