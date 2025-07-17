<template>
  <div :class="ns.b()">
    <div :class="ns.e('head')">
      <div v-if="isMobile">
        <ReButton
          v-show="!isShowWidget"
          @click="emits('update:isShowWidget', true)"
          :icon="DArrowRight"
        />
        <ReButton
          v-show="isShowWidget"
          @click="emits('update:isShowWidget', false)"
          :icon="DArrowLeft"
        />
      </div>
      <ReButton :icon="Share" @click="handleShare" />
      <div v-if="isMobile">
        <ReButton
          v-show="isShowConfig"
          @click="emits('update:isShowConfig', false)"
          :icon="DArrowRight"
        />
        <ReButton
          v-show="!isShowConfig"
          @click="emits('update:isShowConfig', true)"
          :icon="DArrowLeft"
        />
      </div>
    </div>
    <div :class="ns.e('main')">
      <div :class="ns.em('main', 'box')">
        <RenderWidget
          :schema="renderSchema"
          :isDrag="true"
          :selectSchemaId="selectSchemaId"
          @selectSchema="(schema) => emits('selectSchema', schema)"
          @startSchema="(schema, evt) => emits('startSchema', schema, evt)"
          @addSchema="(schema, evt) => emits('addSchema', schema, evt)"
          @removeSchema="(schema, evt) => emits('removeSchema', schema, evt)"
          @updateSchema="(schema, evt) => emits('updateSchema', schema, evt)"
          @endSchema="(schema, evt) => emits('endSchema', schema, evt)"
          @upLevel="(parentSchema, schema, index) => emits('upLevel', parentSchema, schema, index)"
          @moveUp="(parentSchema, schema, index) => emits('moveUp', parentSchema, schema, index)"
          @moveDown="
            (parentSchema, schema, index) => emits('moveDown', parentSchema, schema, index)
          "
          @delete="(parentSchema, schema, index) => emits('delete', parentSchema, schema, index)"
          @copy="(parentSchema, schema, index) => emits('copy', parentSchema, schema, index)"
        >
          <template #default="{ label }">
            <div>{{ label }}</div>
          </template>
        </RenderWidget>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ReButton } from '@tingcode/lib-vue'
  import { useNamespace, getGlobalDataElement } from '@tingcode/system'
  import { copyToClipboard } from '@tingcode/utils'
  import { DArrowLeft, DArrowRight, Share } from '@element-plus/icons-vue'
  import { ISchema, RenderWidget } from './components/render-widget/index'
  import type { SortableEvent } from 'sortablejs'
  defineOptions({ name: 'RendererPlate' })
  interface Props {
    isShowWidget: boolean
    isShowConfig: boolean
    isMobile: boolean
    selectSchemaId?: string
    renderSchema: ISchema
  }

  const emits = defineEmits<{
    (event: 'update:isShowWidget', value: boolean): void
    (event: 'update:isShowConfig', value: boolean): void
    (event: 'selectSchema', schemaItem: ISchema): void
    (event: 'startSchema', schemaItem: ISchema, evt: SortableEvent): void
    (event: 'addSchema', schemaItem: ISchema, evt: SortableEvent): void
    (event: 'removeSchema', schemaItem: ISchema, evt: SortableEvent): void
    (event: 'updateSchema', schemaItem: ISchema, evt: SortableEvent): void
    (event: 'endSchema', schemaItem: ISchema, evt: SortableEvent): void
    (event: 'upLevel', parentSchema: ISchema | undefined, schema: ISchema, index: number): void
    (event: 'moveUp', parentSchema: ISchema | undefined, schema: ISchema, index: number): void
    (event: 'moveDown', parentSchema: ISchema | undefined, schema: ISchema, index: number): void
    (event: 'delete', parentSchema: ISchema | undefined, schema: ISchema, index: number): void
    (event: 'copy', parentSchema: ISchema | undefined, schema: ISchema, index: number): void
  }>()

  const props = withDefaults(defineProps<Props>(), {
    isShowWidget: false,
    isShowConfig: false,
    isMobile: false
  })
  const { isShowWidget, isShowConfig, isMobile, renderSchema, selectSchemaId } = toRefs(props)
  const ns = useNamespace('renderer-plate')

  const { ElMessage } = getGlobalDataElement()

  const handleShare = async () => {
    console.log('🚀 ~ handleShare ~ renderSchema:', renderSchema)
    const { success, message } = await copyToClipboard(toValue(JSON.stringify(renderSchema.value)))
    if (success) {
      ElMessage({
        message: '复制到剪贴板成功',
        type: 'success'
      })
    } else {
      ElMessage({
        message: `复制到剪贴失败： ${message}`,
        type: 'error'
      })
    }
  }
</script>

<style lang="scss" scoped>
  @include b(renderer-plate) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 2px solid getCssVar('text-color', 'placeholder');
    @include e(head) {
      display: flex;
      justify-content: space-between;
    }
    @include e(main) {
      flex: 1;
      overflow: hidden;
      @include m(box) {
        width: 100%;
        height: 100%;
        overflow-y: auto;
      }
    }
  }
</style>
