<template>
  <div :class="ns.b()">
    <div :class="ns.e('left')" v-if="isShowWidget">
      <WidgetPlate @selectSchema="setSelectSchema" />
    </div>
    <div :class="ns.e('main')">
      <RendererPlate
        v-model:isShowWidget="isShowWidget"
        v-model:isShowConfig="isShowConfig"
        :isMobile="isMobile"
        :renderSchema="renderSchema!"
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
    <div :class="ns.e('right')" v-if="isShowConfig">
      <ConfigPlate :selectSchema="selectSchema" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useNamespace, getGlobalDataElement } from '@tingcode/system'
  import { addList, removeList, updateList, cloneDeep } from '@tingcode/utils'
  import { useAppProviderContext } from '@/application/useAppContext'
  import WidgetPlate from './layout/widget-plate/index.vue'
  import RendererPlate from './layout/renderer-plate/index.vue'
  import ConfigPlate from './layout/config-plate/index.vue'
  import { ISchema } from './layout/renderer-plate/components/render-widget/index'
  import { useSchema } from './hooks/useSchema'
  import { defaultSchema } from '@/views/repackage/low-code/hooks/schema'
  const { ElMessage } = getGlobalDataElement()
  const { isMobile } = toRefs(useAppProviderContext())
  defineOptions({ name: 'LowCode' })
  const isShowWidget = ref(true)
  const isShowConfig = ref(true)
  const ns = useNamespace('low-code')
  watch(
    isMobile,
    (val) => {
      isShowWidget.value = !val
      isShowConfig.value = !val
    },
    { immediate: true }
  )
  const selectSchemaId = ref('')
  const selectSchema = ref<ISchema>()
  const { renderSchema } = useSchema<ISchema, any>(defaultSchema, {})

  const setSelectSchema = (schema: ISchema): void => {
    console.log('==========schema', schema)
    selectSchemaId.value = schema.id || ''
    selectSchema.value = schema
  }

  const addSchema = (schema: ISchema, evt): void => {
    schema.child = addList<ISchema>(
      schema.child as ISchema[],
      toValue(selectSchema!)!,
      evt.newIndex
    )
    if (evt.item) {
      evt.item.remove()
    }
  }
  const removeSchema = (schema: ISchema, evt): void => {
    schema.child = removeList(schema.child as ISchema[], evt.oldIndex)
  }
  const updateSchema = (schema: ISchema, evt): void => {
    schema.child = updateList(schema.child as ISchema[], evt.newIndex, evt.oldIndex)
  }
  const handleUpLevel = (parentSchema) => {
    if (parentSchema && parentSchema.id) {
      setSelectSchema(parentSchema)
    } else {
      ElMessage.warning('已到最高层级')
    }
  }
  const handleMoveUp = (parentSchema, schema, index) => {
    if (parentSchema.child && parentSchema.child.length && index > 0) {
      updateSchema(parentSchema, {
        newIndex: index - 1,
        oldIndex: index
      })
    } else {
      ElMessage.warning('已到最高排序')
    }
  }
  const handleMoveDown = (parentSchema, schema, index) => {
    if (parentSchema.child && parentSchema.child.length && index + 1 < parentSchema.child.length) {
      updateSchema(parentSchema, {
        newIndex: index + 1,
        oldIndex: index
      })
    } else {
      ElMessage.warning('已到最末排序')
    }
  }
  const handleDelete = (parentSchema, schema, index) => {
    if (parentSchema.child && parentSchema.child.length) {
      parentSchema.child = removeList(parentSchema.child, index)
    }
  }
  const handleCopy = (parentSchema, schema, index) => {
    if (parentSchema.child && parentSchema.child.length) {
      parentSchema.child = addList(
        parentSchema.child,
        {
          ...cloneDeep(schema),
          id: schema.id
        },
        index + 1
      )
    }
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
      width: calc(86px + 12vw);
      height: 100%;
      overflow: hidden;
    }
    @include e(right) {
      width: calc(86px + 12vw);
      height: 100%;
      overflow: hidden;
    }
  }
</style>
