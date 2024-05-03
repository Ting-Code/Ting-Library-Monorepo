<template>
  <img
    v-if="isExternal"
    :src="icon"
    :class="[$attrs.class, 'svg-external-icon', spin && 'svg-external-icon-spin']"
    :style="styleExternalIcon"
  />
  <SvgIcon v-else :size="size" :name="icon" :class="[$attrs.class]" :spin="spin" />
</template>
<script lang="ts" setup>
  import { CSSProperties, computed } from 'vue'
  import SvgIcon from './SvgIcon.vue'
  import { isExternal as exrernal } from '@tingcli/utils'

  const props = withDefaults(
    defineProps<{
      icon: string
      size?: string | number
      spin?: boolean
    }>(),
    {
      size: 16,
      spin: false
    }
  )

  // 判断是否为外部url图标
  const isExternal = computed(() => exrernal(props.icon))
  // 外部图标样式
  const styleExternalIcon = computed((): CSSProperties => {
    const { size } = props
    let s = `${size}`
    s = `${s.replace('px', '')}px`
    return { fontSize: s }
  })
</script>
<style lang="scss" scoped>
  // url类型的图标样式
  .svg-external-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    background-color: currentColor;
    display: inline-block;

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
