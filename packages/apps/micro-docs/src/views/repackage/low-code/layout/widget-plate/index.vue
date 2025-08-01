<template>
  <div :class="ns.b()">
    <el-text size="large" type="primary">容器</el-text>
    <div :class="ns.e('vessel-box')" ref="vesselRef">
      <template v-for="(item, index) in vesselList" :key="index">
        <ReButton :class="ns.em('vessel-box', 'item')" type="primary">{{ item }}</ReButton>
      </template>
    </div>
    <el-text size="large" type="primary">组件</el-text>
    <div :class="ns.e('widget-box')" ref="widgetRef">
      <template v-for="(item, index) in widgetList" :key="index">
        <ReButton :class="ns.em('widget-box', 'item')" type="primary">{{ item }}</ReButton>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useSortable } from '@vueuse/integrations/useSortable'
  import { useNamespace } from '@tingcode/system'
  import { ReButton, ComponentMap, ISchema } from '@tingcode/lib-vue'
  import { getTypeToSchema, typeToSchemaMap } from '@/views/repackage/low-code/hooks/schema'

  defineOptions({ name: 'ComponentPlate' })
  const ns = useNamespace('component-plate')

  const emits = defineEmits<{
    (event: 'selectSchema', schemaItem: ISchema): void
  }>()

  const vesselList = ref(['ReRow'])
  const widgetList = ref<(keyof typeof ComponentMap)[]>([
    'ReButton',
    'ReInput',
    'ReRadio',
    'ReSelect',
    'ReCheckbox'
  ])
  const vesselRef = useTemplateRef<HTMLElement>('vesselRef')
  const widgetRef = useTemplateRef<HTMLElement>('widgetRef')

  useSortable(vesselRef, vesselList, {
    handle: `.${ns.em('vessel-box', 'item')}`,
    group: { name: 'ReForm', pull: 'clone', put: false },
    onStart: (evt) => {
      const type = vesselList.value[evt.oldIndex!]
      handleSetSchema(type as keyof typeof typeToSchemaMap)
    }
  })
  useSortable(widgetRef, widgetList, {
    handle: `.${ns.em('widget-box', 'item')}`,
    group: { name: 'ReRow', pull: 'clone', put: false },
    onStart: (evt) => {
      const type = widgetList.value[evt.oldIndex!]
      handleSetSchema(type as keyof typeof typeToSchemaMap)
    }
  })

  const handleSetSchema = (type: keyof typeof typeToSchemaMap) => {
    const schema = getTypeToSchema(type)
    emits('selectSchema', schema as ISchema)
  }
</script>

<style lang="scss" scoped>
  @include b(component-plate) {
    border: 2px solid getCssVar('text-color', 'placeholder');
    padding-top: 20px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    @include e(vessel-box) {
      padding: 10px 0;
      margin: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      @include m(item) {
        width: 80px;
        margin: 2px 6px !important;
      }
    }
    @include e(widget-box) {
      padding: 10px 0;
      margin: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      @include m(item) {
        width: 86px;
        margin: 2px 6px !important;
      }
    }
  }
</style>
