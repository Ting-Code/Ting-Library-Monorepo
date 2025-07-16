<template>
  <div :class="ns.b()"> </div>
</template>

<script setup lang="ts">
  import { useNamespace } from '@tingcode/system'
  import { ISchema } from '@/views/repackage/low-code/layout/renderer-plate/components/render-widget/index'
  defineOptions({ name: 'ConfigPlate' })
  const ns = useNamespace('config-plate')
  const { selectSchema } = defineProps<{
    renderSchema: ISchema
    selectSchema: ISchema
  }>()

  watch(
    () => selectSchema,
    () => {
      console.log('=====props.selectSchema', selectSchema, toValue(selectSchema))
    }
  )
</script>

<style lang="scss" scoped>
  @include b(config-plate) {
    border: 2px solid getCssVar('text-color', 'placeholder');
    padding-top: 20px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
