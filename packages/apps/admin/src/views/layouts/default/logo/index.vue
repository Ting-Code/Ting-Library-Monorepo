<template>
  <div :class="ns.b()">
    <div :class="ns.e('left')">
      <Icon icon="logo-ting" size="38" />
    </div>
    <div :class="ns.e('right')" v-show="showTitle" v-if="props.showTitle"> Ting Library </div>
  </div>
</template>

<script setup lang="ts">
  import { Icon } from '@tingcode/lib-vue'
  import { useNamespace } from '@tingcode/system'
  const ns = useNamespace('app-logo')

  defineOptions({
    name: 'HeaderLogo'
  })

  const props = defineProps({
    showTitle: { type: Boolean, default: true }
  })
</script>

<style lang="scss" scoped>
  @use 'sass:map';

  $app-logo: () !default;
  $app-logo: map.merge(
    (
      'text-color': getCssVar('text-color', 'primary'),
      'border-color': getCssVar('border-color')
    ),
    $app-logo
  );

  @include b(app-logo) {
    @include set-component-css-var('app-logo', $app-logo);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    @include e(left) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 38px;
      height: 38px;
      overflow: hidden;
      border-radius: 50%;
      border: 2px solid getCssVar('app-logo', 'border-color');
    }

    @include e(right) {
      color: getCssVar('app-logo', 'text-color');
      font-weight: getCssVar('font-weight-bold');
      margin-left: 10px;
    }
  }
</style>
