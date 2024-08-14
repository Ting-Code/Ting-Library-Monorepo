<template>
  <svg
    :style="svgStyle"
    :class="['svg-icon', $attrs.class, spin && 'svg-icon-spin']"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
  import type { CSSProperties } from 'vue'
  import { PropType, computed } from 'vue'

  const props = defineProps({
    name: {
      type: String as PropType<string>,
      required: true
    },
    spin: {
      type: Boolean,
      default: false
    },
    size: {
      type: [Number, String],
      default: 16
    }
  })
  // 项目内图标
  const iconName = computed(() => `#icon-${props.name}`)
  const svgStyle = computed((): CSSProperties => {
    const { size } = props
    let s = `${size}`
    s = `${s.replace('px', '')}px`
    return { fontSize: s }
  })
</script>

<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;

    &-spin {
      animation: loadingCircle 1s infinite linear;
    }
  }

  @-webkit-keyframes loadingCircle {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes loadingCircle {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
