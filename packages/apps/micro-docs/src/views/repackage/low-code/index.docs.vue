<template>
  <div :class="ns.b()">
    <div :class="ns.e('left')">
      <ComponentPlate />
    </div>
    <div :class="ns.e('main')">
      <RendererPlate
        v-model:isShowStencil="isShowStencil"
        :isMobile="isMobile"
        :renderSchema="renderSchema"
        :selectSchemaId="selectSchemaId"
        @selectSchema="setSelectSchema"
        @addSchema="addSchema"
        @removeSchema="removeSchema"
        @updateSchema="updateSchema"
        @upLevel="handleUpLevel"
        @moveUp="handleMoveUp"
        @moveDown="handleMoveDown"
        @delete="handleDelete"
        @copy="handleCopy"
      />
    </div>
    <div :class="ns.e('right')">右边</div>
  </div>
</template>

<script setup lang="ts">
  import { useNamespace } from '@tingcode/system'
  import { addList, removeList, updateList } from '@tingcode/utils'
  import { useAppProviderContext } from '@/application/useAppContext'
  import ComponentPlate from './layout/component-plate/index.vue'
  import RendererPlate from '@/views/repackage/low-code/layout/renderer-plate/index.vue'
  import { ISchema } from './layout/renderer-plate/components/render-widget/index'
  import { useSchema } from './hooks/useSchema'
  import { defaultSchema } from '@/views/repackage/low-code/hooks/schema'
  import { ElMessage } from 'element-plus'
  const { isMobile } = toRefs(useAppProviderContext())
  defineOptions({ name: 'LowCode' })
  const isShowStencil = ref(true)
  const ns = useNamespace('low-code')
  watch(
    isMobile,
    (val) => {
      if (val) {
        isShowStencil.value = false
      } else {
        isShowStencil.value = true
      }
    },
    { immediate: true }
  )
  const selectSchemaId = ref('')
  const selectSchema = ref<ISchema>()
  const { renderSchema } = useSchema<ISchema, any>(defaultSchema, {})

  const setSelectSchema = (schema: ISchema): void => {
    selectSchemaId.value = schema.id || ''
    selectSchema.value = schema
  }

  const addSchema = (schema: ISchema, evt): void => {
    schema.child = addList<ISchema>(
      schema.child as ISchema[],
      toValue(selectSchema!)!,
      evt.newIndex
    )
  }
  const removeSchema = (schema: ISchema, evt): void => {
    schema.child = removeList(schema.child as ISchema[], evt.oldIndex)
  }
  const updateSchema = (schema: ISchema, evt): void => {
    schema.child = updateList(schema.child as ISchema[], evt.newIndex, evt.oldIndex)
  }
  const handleUpLevel = (parentSchema) => {
    if (parentSchema && parentSchema.id) {
      selectSchema.value = parentSchema
      selectSchemaId.value = parentSchema.id
    } else {
      ElMessage.warning('已到最高层级')
    }
  }
  const handleMoveUp = (parentSchema, schema, index) => {
    console.log(parentSchema, schema, index)
  }
  const handleMoveDown = (parentSchema, schema, index) => {
    console.log(parentSchema, schema, index)
  }
  const handleDelete = (parentSchema, schema, index) => {
    console.log(parentSchema, schema, index)
  }
  const handleCopy = (parentSchema, schema, index) => {
    console.log(parentSchema, schema, index)
  }
</script>

<style lang="scss" scoped>
  @include b(low-code) {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;

    @include e(main) {
      height: 100%;
      overflow: hidden;
      flex: 1;
    }
    @include e(left) {
      width: 200px;
      height: 100%;
      overflow: hidden;
    }
    @include e(right) {
      width: 200px;
      height: 100%;
      overflow: hidden;
    }
  }
</style>
