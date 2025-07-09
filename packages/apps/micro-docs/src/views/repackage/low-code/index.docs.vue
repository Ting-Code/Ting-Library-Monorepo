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
        @select-schema="setSelectSchema"
      />
    </div>
    <div :class="ns.e('right')">右边</div>
  </div>
</template>

<script setup lang="ts">
  import { useNamespace } from '@tingcode/system'
  import { cloneDeep } from '@tingcode/utils'
  import { useAppProviderContext } from '@/application/useAppContext'
  import ComponentPlate from './layout/component-plate/index.vue'
  import RendererPlate from '@/views/repackage/low-code/layout/renderer-plate/index.vue'
  import { ISchema } from './layout/renderer-plate/components/render-widget/index'
  import { useSchema } from './hooks/useSchema'
  import { defaultSchema } from '@/views/repackage/low-code/hooks/schema'
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
  const selectSchema = ref({})

  const setSelectSchema = (schema: ISchema): void => {
    selectSchemaId.value = schema.id || ''
    selectSchema.value = cloneDeep(schema)
  }

  const { renderSchema } = useSchema<ISchema, any>(defaultSchema, { one: '123123' })
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
