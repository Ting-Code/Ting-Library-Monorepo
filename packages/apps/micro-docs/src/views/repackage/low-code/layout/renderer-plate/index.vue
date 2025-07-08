<template>
  <div :class="ns.b()">
    <div :class="ns.e('head')">
      <template v-if="isMobile">
        <ReButton v-show="!props.isShowStencil" @click="emit('update:isShowStencil', true)" />
        <ReButton v-show="props.isShowStencil" @click="emit('update:isShowStencil', false)" />
      </template>
      <ReButton :icon="Share" />
      <ReButton :icon="CaretLeft" />
      <ReButton :icon="CaretRight" />
      <ReButton :icon="Delete" />
      <ReButton :icon="ZoomIn" />
      <ReButton :icon="ZoomOut" @click="handleOut" />
    </div>
    <div :class="ns.e('main')">
      {{ model }}
      <RenderWidget
        :schema="renderSchema"
        v-model="model"
        :isDrag="true"
        :select-schema-id="selectSchemaId"
        :setSelectSchemaId="setSelectSchemaId"
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
  import { RenderWidget } from './components/render-widget/index'
  import { ISchema } from './components/render-widget/index'
  import { useSchema } from '@/views/repackage/low-code/layout/renderer-plate/hooks/useSchema'
  defineOptions({ name: 'RendererPlate' })
  interface Props {
    isShowStencil: boolean
    isMobile: boolean
  }

  const emit = defineEmits<{
    (e: 'update:isShowStencil', value: boolean): void
  }>()

  const props = withDefaults(defineProps<Props>(), {
    isShowStencil: false,
    isMobile: false
  })
  const ns = useNamespace('renderer-plate')

  const selectSchemaId = ref('')

  const setSelectSchemaId = (id: string): void => {
    console.log('=======setSelectSchemaId', id)
    selectSchemaId.value = id
  }

  const { renderSchema, model, switchAllHide } = useSchema<ISchema, any>(
    {
      type: 'ReForm',
      slotName: { native: 'icon', name: 'one' },
      child: {
        id: 'ReRow',
        type: 'ReRow',
        child: [
          {
            type: 'ReCol',
            id: 'ReCol1',
            attrs: {
              span: 12
            },
            child: {
              type: 'ReFormItem',
              attrs: {
                label: '请输入'
              },
              child: {
                type: 'ReInput',
                field: 'one'
              }
            }
          },
          {
            type: 'ReCol',
            id: 'ReCol2',
            attrs: {
              span: 12
            },
            child: {
              type: 'ReFormItem',
              attrs: {
                label: '请输入'
              },
              child: {
                type: 'ReInput',
                field: 'tow.key'
              }
            }
          },
          {
            type: 'ReCol',
            id: 'ReCol3',
            attrs: {
              span: 12
            },
            child: {
              type: 'ReFormItem',
              attrs: {
                label: '请输入'
              },
              child: {
                type: 'ReInput',
                field: 'tow.key',
                slotName: { native: 'suffix', name: 'tow' }
              }
            }
          }
        ]
      }
    },
    { one: '123123' }
  )
  watch(renderSchema, () => {}, { deep: true, immediate: true })
  const handleOut = () => {
    switchAllHide({ type: 'ReCol' }, 'switch')
  }
</script>

<style lang="scss" scoped>
  @include b(renderer-plate) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
