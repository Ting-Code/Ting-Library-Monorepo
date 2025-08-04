<template>
  <div :class="ns.b()" @click="handleAddressClick">
    <div :class="ns.e('left-buttons')">
      <div :class="ns.em('left-buttons', 'close')"></div>
      <div :class="ns.em('left-buttons', 'minimize')"></div>
      <div :class="ns.em('left-buttons', 'maximize')"></div>
    </div>

    <div :class="ns.e('address-bar')">
      <div :class="ns.em('address-bar', 'security-icon')"></div>
      <div :class="ns.em('address-bar', 'url')">{{ url }}</div>
      <div :class="ns.em('address-bar', 'refresh-icon')"></div>
    </div>

    <div :class="ns.e('function-buttons')"> </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useNamespace } from '@tingcode/system'

  export interface HeaderProps {
    url?: string
  }

  const props = defineProps<HeaderProps>()

  const url = ref(props.url)
  const ns = useNamespace('browser-header')

  // 处理地址栏点击事件
  const handleAddressClick = () => {
    if (url.value) {
      let targetUrl = url.value
      window.open(targetUrl, '_blank')
    }
  }
</script>

<style scoped lang="scss">
  @include b(browser-header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px;

    @include e(left-buttons) {
      display: flex;
      margin: 0 12px;
      width: 100px;

      @include m(close) {
        width: 12px;
        height: 12px;
        margin: 0 3px;
        border-radius: 50%;
        background-color: #ff5f56;
      }

      @include m(minimize) {
        width: 12px;
        height: 12px;
        margin: 0 3px;
        border-radius: 50%;
        display: inline-flex;
        background-color: #ffbd2e;
      }

      @include m(maximize) {
        width: 12px;
        height: 12px;
        margin: 0 3px;
        border-radius: 50%;
        display: inline-flex;
        background-color: #27c93f;
      }
    }

    @include e(address-bar) {
      display: flex;
      align-items: center;
      background: getCssVar('text-color', 'primary');
      border-radius: 12px;
      padding: 3px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        transform: scale(1.01);
      }

      &:active {
        transform: scale(0.99);
      }

      @include m(security-icon) {
        width: 8px;
        height: 8px;
        margin: 6px;
        background-color: #27c93f;
        border-radius: 50%;
      }

      @include m(url) {
        font-size: 12px;
        color: getCssVar('bg-color', 'main');
        text-align: center;
      }

      @include m(refresh-icon) {
        width: 8px;
        height: 8px;
        background-color: #666;
        margin: 6px;
        border-radius: 2px;
      }
    }

    @include e(function-buttons) {
      width: 100px;
      display: flex;
    }
  }
</style>
