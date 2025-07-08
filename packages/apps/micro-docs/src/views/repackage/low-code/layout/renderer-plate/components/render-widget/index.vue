<template>
  <component
    :is="getComponent(schema.type)"
    v-bind="schema.attrs || {}"
    v-if="isChildDrag || isInitSortable"
    :class="[ns.e('wrapper'), schema.id]"
    ref="el"
    @click.stop="handleClickEl"
  >
    <template v-for="(item, index) in schema.child || []" :key="`${schema.id}${item.id}${index}`">
      <RenderWidget
        :schema="item"
        :model="model"
        :isDrag="isDrag"
        :parentSchemaId="schema.id"
        :parentSchemaType="schema.type"
        :selectSchemaId="selectSchemaId"
        :setSelectSchemaId="setSelectSchemaId"
      >
        <template v-for="(_, name) in slots" #[name]="native">
          <slot :name="name" v-bind="native || {}"></slot>
        </template>
      </RenderWidget>
    </template>
    <div v-if="schema.id === selectSchemaId">
      <div :class="ns.e('action')"> <i>拖拽栏</i> </div>

      <div :class="ns.e('handler')">
        <i>拖拽栏</i>
      </div>
    </div>

    <template v-for="{ name, native } in filterSlots(slots, schema.slotName)" #[native]="scope">
      <slot :name="name" v-bind="scope || {}"></slot>
    </template>
  </component>

  <component v-else :is="getComponent(schema.type)" v-bind="schema.attrs || {}">
    <template v-for="item in schema.child || []" :key="item.type + JSON.stringify(item.attrs)">
      <RenderWidget
        :schema="item"
        :model="model"
        :isDrag="isDrag"
        :parentSchemaId="schema.id"
        :parentSchemaType="schema.type"
        :selectSchemaId="selectSchemaId"
        :setSelectSchemaId="setSelectSchemaId"
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
  import { useSortable } from '@vueuse/integrations/useSortable'
  import { ComponentMap, RenderWidgetEmits, RenderWidgetProps } from './index'
  import { filterSlots } from '../../hooks/useSchema'
  import { useNamespace } from 'element-plus'
  defineOptions({ name: 'RenderWidget' })
  const props = withDefaults(defineProps<RenderWidgetProps>(), {
    isDrag: false,
    setSelectSchemaId: () => {}
  })
  const {
    model,
    schema,
    isDrag,
    selectSchemaId,
    setSelectSchemaId,
    parentSchemaId,
    parentSchemaType
  } = toRefs(props)
  const emits = defineEmits<RenderWidgetEmits>()
  const slots = defineSlots()

  const ns = useNamespace('render-widget')

  const getComponent = (type: string) => {
    return ComponentMap[type] || type
  }

  const isChildDrag = computed(() => {
    return (
      toValue(isDrag) &&
      toValue(parentSchemaId) &&
      ['ReRow'].includes(toValue(parentSchemaType) || '')
    )
  })

  const isInitSortable = computed(() => {
    return toValue(isDrag) && toValue(schema)?.id && ['ReRow'].includes(toValue(schema)?.type)
  })

  const el = useTemplateRef<HTMLElement>('el')

  if (toValue(isInitSortable)) {
    setTimeout(() => {
      console.log('========初始化useSortable========', schema.value.id)
    }, 1000)
    useSortable(el, (schema.value.child || []) as any[], {
      group: 'items',
      animation: 150, // ms, number 单位：ms，定义排序动画的时间
      sort: true, // 是否日期内可以拖拽排序
      handle: `.${ns.e('handler')}`,
      ghostClass: ns.e('ghost'), // drop placeholder的css类名
      dragClass: ns.e('drag'), // 正在被拖拽中的css类名
      // 元素被选中
      onChoose: (evt) => {
        console.log('🚀 ~ onChoose:', evt, schema.value?.id)
      },
      // 开始拖拽的时候
      onStart: (evt) => {
        console.log('🚀 ~ eonStart:', evt, schema.value?.id)
      },
      // 结束拖拽
      onEnd: (evt) => {
        console.log('🚀 ~ onEnd:', evt, schema.value?.id)
      },
      // 元素从一个列表拖拽到另一个列表
      onAdd: (evt) => {
        console.log('🚀 ~ onAdd:', evt, schema.value?.id)
      },
      // 元素从列表中移除进入另一个列表
      onRemove: (evt) => {
        console.log('🚀 ~ onRemove:', evt, schema.value?.id)
      }
    })
  }

  const handleClickEl = (event) => {
    emits('click', event)
    if (!toValue(isChildDrag)) return
    toValue(setSelectSchemaId)(schema.value.id)
  }
</script>

<style lang="scss">
  @include b('render-widget') {
    @include e(wrapper) {
      width: 100%;
      height: 100%;
      display: inline-block;
      min-height: 38px;
      padding: 6px;
      outline: 1px dotted getCssVar('border-color', 'darker');
      position: relative;
    }

    @include e(drag) {
      outline: 1px dotted #0659c7;
    }

    @include e(ghost) {
      content: '';
      font-size: 0;
      height: 3px;
      box-sizing: border-box;
      background: red;
      border: 2px solid blue;
      outline-width: 0;
      padding: 0;
      overflow: hidden;
    }

    @include e(action) {
      position: absolute;
      bottom: 0;
      right: -2px;
      height: 28px;
      line-height: 28px;
      background: red;
      z-index: 999;

      i {
        font-size: 14px;
        color: #fff;
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
      background: blue;
      z-index: 9;

      i {
        font-size: 14px;
        font-style: normal;
        color: #fff;
        margin: 4px;
        cursor: default;
      }
    }
  }
</style>
