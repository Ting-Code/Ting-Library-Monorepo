<template>
  <div :class="ns.b()">
    <el-text size="large" type="primary">配置项</el-text>
    <RenderWidget v-if="renderSchema" :schema="renderSchema" />
  </div>
</template>

<script setup lang="ts">
  import { useNamespace } from '@tingcode/system'
  import { useSchema, ISchema } from '@tingcode/lib-vue'
  import { RenderWidget } from '../renderer-plate/components/render-widget/index'
  import { getConfigSchema } from '@/views/repackage/low-code/hooks/schema'
  defineOptions({ name: 'ConfigPlate' })
  const ns = useNamespace('config-plate')
  const { selectSchema } = defineProps<{
    selectSchema: ISchema | undefined
  }>()
  const { renderSchema, generateRenderSchema } = useSchema<ISchema, any>(undefined, selectSchema)

  watch(
    () => selectSchema,
    () => {
      if (selectSchema) {
        const schema = getConfigSchema()
        generateRenderSchema(schema as ISchema, selectSchema)
      }
    }
  )
</script>

<style lang="scss" scoped>
  @include b(config-plate) {
    border: 2px solid getCssVar('text-color', 'placeholder');
    padding: 20px 12px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
