<template>
  <div :class="ns.b()">
    <div :class="ns.e('head')">
      <template v-if="isMobile">
        <ReButton v-show="!isShowStencil" @click="emits('update:isShowStencil', true)" />
        <ReButton v-show="isShowStencil" @click="emits('update:isShowStencil', false)" />
      </template>
      <ReButton :icon="Share" @click="handleClick" />
      <ReButton :icon="CaretLeft" />
      <ReButton :icon="CaretRight" />
      <ReButton :icon="Delete" />
      <ReButton :icon="ZoomIn" />
      <ReButton :icon="ZoomOut" />
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
          <template #one>
            <div>按钮#one</div>
          </template>
          <template #tow>
            <div>按钮#tow</div>
          </template>
        </RenderWidget>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ReButton } from '@tingcode/lib-vue'
  import { useNamespace } from '@tingcode/system'
  import { CaretLeft, CaretRight, Delete, Share, ZoomIn, ZoomOut } from '@element-plus/icons-vue'
  import { ISchema, RenderWidget } from './components/render-widget/index'
  import type { SortableEvent } from 'sortablejs'
  defineOptions({ name: 'RendererPlate' })
  interface Props {
    isShowStencil: boolean
    isMobile: boolean
    selectSchemaId?: string
    renderSchema: ISchema
  }

  const emits = defineEmits<{
    (event: 'update:isShowStencil', value: boolean): void
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
    isShowStencil: false,
    isMobile: false
  })

  const { isShowStencil, isMobile, renderSchema, selectSchemaId } = toRefs(props)
  const ns = useNamespace('renderer-plate')

  const handleClick = () => {
    console.log('🚀 ~ handleClick ~ renderSchema:', renderSchema)
  }
</script>

<style lang="scss" scoped>
  @include b(renderer-plate) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
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
