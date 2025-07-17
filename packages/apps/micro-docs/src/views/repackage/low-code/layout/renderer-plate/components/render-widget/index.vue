<template>
  <component
    :is="getComponent(schema.type)"
    v-bind="schema.attrs || {}"
    v-if="isChildDrag || isInitSortable"
    :class="[ns.e('wrapper'), isActive && ns.e('active')]"
    ref="el"
    @click.stop="handleClickEl"
  >
    <template v-for="(item, idx) in schema.child || []" :key="`${schema.id}${item.id}${idx}`">
      <RenderWidget
        :schema="item"
        :model="model"
        :isDrag="isDrag"
        :index="idx"
        :parentSchema="schema"
        :parentSchemaId="schema.id"
        :parentSchemaType="schema.type"
        :selectSchemaId="selectSchemaId"
        @selectSchema="(schema) => emits('selectSchema', schema)"
        @startSchema="(schema, evt) => emits('startSchema', schema, evt)"
        @addSchema="(schema, evt) => emits('addSchema', schema, evt)"
        @removeSchema="(schema, evt) => emits('removeSchema', schema, evt)"
        @updateSchema="(schema, evt) => emits('updateSchema', schema, evt)"
        @endSchema="(schema, evt) => emits('endSchema', schema, evt)"
        @upLevel="(parentSchema, schema, index) => emits('upLevel', parentSchema, schema, index)"
        @moveUp="(parentSchema, schema, index) => emits('moveUp', parentSchema, schema, index)"
        @moveDown="(parentSchema, schema, index) => emits('moveDown', parentSchema, schema, index)"
        @delete="(parentSchema, schema, index) => emits('delete', parentSchema, schema, index)"
        @copy="(parentSchema, schema, index) => emits('copy', parentSchema, schema, index)"
      >
        <template v-for="(_, name) in slots" #[name]="native">
          <slot :name="name" v-bind="native || {}"></slot>
        </template>
      </RenderWidget>
    </template>
    <div :class="ns.e('action')" v-if="isActive && isChildDrag">
      <ElIcon @click.stop="handleUpLevel"><Back /></ElIcon>
      <ElIcon @click.stop="handleMoveUp"><Top /></ElIcon>
      <ElIcon @click.stop="handleMoveDown"><Bottom /></ElIcon>
      <ElIcon @click.stop="handleDelete"><Delete /></ElIcon>
      <ElIcon @click.stop="handleCopy"><CopyDocument /></ElIcon>
    </div>

    <div :class="ns.e('handler')" v-if="isActive && isChildDrag">
      <ElIcon><Rank /></ElIcon>
      <span>{{ `${schema.type}-${((schema.attrs || {}) as any).name || ''}` }}</span>
    </div>

    <template v-for="{ name, native } in filterSlots(slots, schema.slotName)" #[native]="scope">
      <slot :name="name" v-bind="scope || {}"></slot>
    </template>
  </component>

  <component v-else :is="getComponent(schema.type)" v-bind="schema.attrs || {}" ref="el">
    <template v-for="(item, idx) in schema.child || []" :key="`${schema.id}${item.id}${idx}`">
      <RenderWidget
        :schema="item"
        :model="model"
        :isDrag="isDrag"
        :index="idx"
        :parentSchema="schema"
        :parentSchemaId="schema.id"
        :parentSchemaType="schema.type"
        :selectSchemaId="selectSchemaId"
        @selectSchema="(schema) => emits('selectSchema', schema)"
        @startSchema="(schema, evt) => emits('startSchema', schema, evt)"
        @addSchema="(schema, evt) => emits('addSchema', schema, evt)"
        @removeSchema="(schema, evt) => emits('removeSchema', schema, evt)"
        @updateSchema="(schema, evt) => emits('updateSchema', schema, evt)"
        @endSchema="(schema, evt) => emits('endSchema', schema, evt)"
        @upLevel="(parentSchema, schema, index) => emits('upLevel', parentSchema, schema, index)"
        @moveUp="(parentSchema, schema, index) => emits('moveUp', parentSchema, schema, index)"
        @moveDown="(parentSchema, schema, index) => emits('moveDown', parentSchema, schema, index)"
        @delete="(parentSchema, schema, index) => emits('delete', parentSchema, schema, index)"
        @copy="(parentSchema, schema, index) => emits('copy', parentSchema, schema, index)"
      >
        <template v-for="(_, name) in slots" #[name]="native">
          <slot :name="name" v-bind="native || {}"></slot>
        </template>
      </RenderWidget>
    </template>
    <template v-for="{ name, native } in filterSlots(slots, schema.slotName)" #[native]="scope">
      <slot :name="name" v-bind="scope || {}"></slot>
    </template>
  </component>
</template>

<script setup lang="ts">
  import { useNamespace, ElIcon } from 'element-plus'
  import { Rank, Back, Top, Bottom, Delete, CopyDocument } from '@element-plus/icons-vue'
  import { useSortable } from '@vueuse/integrations/useSortable'
  import { ComponentMap, RenderWidget, RenderWidgetEmits, RenderWidgetProps } from './index'
  import { filterSlots } from '@tingcode/lib-vue'
  defineOptions({ name: 'RenderWidget' })
  const props = withDefaults(defineProps<RenderWidgetProps>(), {
    isDrag: false,
    index: 0
  })
  const {
    model,
    schema,
    isDrag,
    selectSchemaId,
    parentSchemaId,
    parentSchemaType,
    parentSchema,
    index
  } = toRefs(props)
  const emits = defineEmits<RenderWidgetEmits>()
  const slots = defineSlots()

  const ns = useNamespace('render-widget')

  const getComponent = (type: string) => {
    return ComponentMap[type] || type
  }

  const isActive = toRef(() => schema.value.id === selectSchemaId.value)

  const dragVessel = ['ReForm', 'ReRow']
  const isChildDrag = computed(() => {
    return (
      toValue(isDrag) &&
      toValue(parentSchemaId) &&
      dragVessel.includes(toValue(parentSchemaType) || '')
    )
  })

  const isInitSortable = computed(() => {
    return toValue(isDrag) && toValue(schema)?.id && dragVessel.includes(toValue(schema)?.type)
  })

  const el = useTemplateRef<HTMLElement>('el')

  if (toValue(isInitSortable)) {
    useSortable(el, (schema.value.child || []) as any[], {
      group: schema.value.type,
      animation: 150, // ms, number 单位：ms，定义排序动画的时间
      sort: true, // 是否日期内可以拖拽排序
      handle: `.${ns.e('handler')}`,
      ghostClass: ns.e('ghost'), // drop placeholder的css类名
      dragClass: ns.e('drag'), // 正在被拖拽中的css类名
      onStart: (evt) => {
        emits('startSchema', toValue(schema), evt)
      },
      onAdd: (evt) => {
        emits('addSchema', toValue(schema), evt)
      },
      onRemove: (evt) => {
        emits('removeSchema', toValue(schema), evt)
      },
      onUpdate: (evt) => {
        emits('updateSchema', toValue(schema), evt)
      },
      onEnd: (evt) => {
        emits('endSchema', toValue(schema), evt)
      }
    })
  }

  const handleClickEl = (event) => {
    emits('click', event)
    if (!toValue(isChildDrag)) return
    emits('selectSchema', toValue(schema))
  }
  const handleUpLevel = () => {
    emits('upLevel', toValue(parentSchema), toValue(schema), toValue(index))
  }
  const handleMoveUp = () => {
    emits('moveUp', toValue(parentSchema), toValue(schema), toValue(index))
  }
  const handleMoveDown = () => {
    emits('moveDown', toValue(parentSchema), toValue(schema), toValue(index))
  }
  const handleDelete = () => {
    emits('delete', toValue(parentSchema), toValue(schema), toValue(index))
  }
  const handleCopy = () => {
    emits('copy', toValue(parentSchema), toValue(schema), toValue(index))
  }
</script>

<style lang="scss">
  @include b('render-widget') {
    @include e(wrapper) {
      position: relative;
      min-height: 28px;
      padding: 12px;
      outline: 1px dotted getCssVar('border-color', 'darker');
    }
    @include e(drag) {
      outline: 1px dotted getCssVar('text-color', 'primary');
    }
    @include e(ghost) {
      content: '';
      font-size: 0;
      box-sizing: border-box;
      min-width: 200px;
      width: 100%;
      height: 100%;
      background: getCssVar('text-color', 'placeholder');
      border: 3px solid getCssVar('text-color', 'primary');
      outline-width: 0;
      padding: 0;
      overflow: hidden;
    }
    @include e(active) {
      position: relative;
      border: 2px solid getCssVar('text-color', 'placeholder');
    }
    @include e(action) {
      position: absolute;
      bottom: 0;
      right: -2px;
      height: 28px;
      line-height: 28px;
      background: getCssVar('text-color', 'placeholder');
      z-index: 999;

      i {
        font-size: 14px;
        color: getCssVar('text-color', 'primary');
        margin: 0 5px;
        cursor: pointer;
      }
    }
    @include e(handler) {
      position: absolute;
      top: -2px;
      left: -2px;
      height: 22px;
      line-height: 22px;
      background: getCssVar('text-color', 'placeholder');
      z-index: 9;

      i {
        font-size: 14px;
        font-style: normal;
        color: getCssVar('text-color', 'primary');
        margin: 4px;
        cursor: default;
      }
    }
  }
</style>
