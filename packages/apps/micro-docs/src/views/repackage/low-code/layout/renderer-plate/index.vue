<template>
  <div :class="ns.b()">
    <div :class="ns.e('head')">
      <template v-if="isMobile">
        <ReButton v-show="!isShowStencil" @click="emit('update:isShowStencil', true)" />
        <ReButton v-show="isShowStencil" @click="emit('update:isShowStencil', false)" />
      </template>
      <ReButton :icon="Share" />
      <ReButton :icon="CaretLeft" />
      <ReButton :icon="CaretRight" />
      <ReButton :icon="Delete" />
      <ReButton :icon="ZoomIn" />
      <ReButton :icon="ZoomOut" />
    </div>
    <div :class="ns.e('main')">
      <RenderWidget
        :schema="renderSchema"
        :isDrag="true"
        :selectSchemaId="selectSchemaId"
        @selectSchema="(schema) => emit('selectSchema', schema)"
        @startSchema="(schema, evt) => emit('startSchema', schema, evt)"
        @addSchema="(schema, evt) => emit('addSchema', schema, evt)"
        @removeSchema="(schema, evt) => emit('removeSchema', schema, evt)"
        @updateSchema="(schema, evt) => emit('updateSchema', schema, evt)"
        @endSchema="(schema, evt) => emit('endSchema', schema, evt)"
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

  const emit = defineEmits<{
    (event: 'update:isShowStencil', value: boolean): void
    (event: 'selectSchema', schemaItem: ISchema): void
    (event: 'startSchema', schemaItem: ISchema, evt: SortableEvent): void
    (event: 'addSchema', schemaItem: ISchema, evt: SortableEvent): void
    (event: 'removeSchema', schemaItem: ISchema, evt: SortableEvent): void
    (event: 'updateSchema', schemaItem: ISchema, evt: SortableEvent): void
    (event: 'endSchema', schemaItem: ISchema, evt: SortableEvent): void
  }>()

  const { isShowStencil, isMobile, renderSchema, selectSchemaId } = toRefs(
    withDefaults(defineProps<Props>(), {
      isShowStencil: false,
      isMobile: false
    })
  )
  const ns = useNamespace('renderer-plate')
</script>

<style lang="scss" scoped>
  @include b(renderer-plate) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
