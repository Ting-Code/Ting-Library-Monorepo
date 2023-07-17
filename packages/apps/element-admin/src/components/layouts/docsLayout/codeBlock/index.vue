<template>
  <div :class="ns.b()">
    <SoundPath :src="props.src" :sound-path="soundPath" />
    <div :class="ns.e('code-box')" v-if="props?.showCode || props?.showRender">
      <div :class="ns.em('code-box', 'render')" v-if="props?.is && props?.showRender">
        <component :is="props?.is" ref="demo" />
      </div>
      <div :class="ns.em('code-box', 'code')" v-if="props?.showCode">
        <SoundCode :code="code" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineOptions } from 'vue'
  import SoundPath from './path.vue'
  import SoundCode from './code.vue'
  import { ref, defineProps, computed, nextTick } from 'vue'
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

  nextTick(() => {
    if (demo?.value?.__getSoundPath) {
      soundPath.value = demo?.value?.__getSoundPath()
    }
    if (demo?.value?.__getSoundCode) {
      soundCode.value = demo?.value?.__getSoundCode()
    }
  })

  const code = computed(() => {
    return decodeURIComponent(props.code || soundCode.value || '')
  })
</script>

<style lang="scss">
  @include b(code-block) {
    @include e(code-box) {
      border-radius: 8px;
      border: 1px solid red;
      overflow: hidden;
      @include m(render) {
        background-color: #0d1117;
        border-bottom: 1px solid red;
        padding: 20px calc(2vw);
      }
    }
  }
</style>
