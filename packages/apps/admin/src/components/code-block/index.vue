<template>
  <div :class="ns.b()">
    <SoundPath :src="props.src" :sound-path="soundPath" />
    <div :class="ns.e('code-box')" v-if="props?.showCode || props?.showRender">
      <div :class="ns.em('code-box', 'render')" v-if="props?.is && props?.showRender">
        <component :is="props?.is" ref="demo" />
      </div>
      <div :class="ns.em('code-box', 'code')" v-if="props?.showCode">
        <SoundCode :code="code" :defaultShowCode="props?.defaultShowCode" :type="props.type" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, computed, ref, nextTick } from 'vue'
  import SoundPath from './sound-path-once.vue'
  import SoundCode from './sound-code-once.vue'
  import type { Component } from 'vue'
  import { useNamespace } from '@/hooks/useNamespace'

  defineOptions({
    name: 'CodeBlock'
  })

  const props = withDefaults(
    defineProps<{
      src?: string
      code?: string
      is?: Component
      showCode?: boolean
      showRender?: boolean
      showPath?: boolean
      defaultShowCode?: boolean
      type?: 'html' | 'css' | 'javascript' | 'typescript' | 'ts' | 'js' | 'scss'
    }>(),
    {
      showPath: true,
      showRender: true,
      showCode: true
    }
  )
  const demo = ref()
  const soundPath = ref()
  const soundCode = ref()

  const ns = useNamespace('code-block')

  onMounted(() => {
    nextTick(() => {
      if (demo?.value?.__getSoundPath) {
        soundPath.value = demo?.value?.__getSoundPath()
      }
      if (demo?.value?.__getSoundCode) {
        soundCode.value = demo?.value?.__getSoundCode()
      }
    })
  })

  const code = computed(() => {
    return decodeURIComponent(props.code || soundCode.value || '')
  })
</script>

<style lang="scss">
  @include b(code-block) {
    padding: 0 0 28px;
    @include e(code-box) {
      background-color: getCssVar(bg-color);
      border-radius: 8px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      @include m(render) {
        border-bottom: 1px solid getCssVar(border-color);
        padding: 20px calc(2vw);
      }
    }
  }
</style>
