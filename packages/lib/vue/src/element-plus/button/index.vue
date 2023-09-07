<template>
  <ButtonMap v-if="isUnNative" :type="props?.type as IButtonMapType" v-bind="$attrs" />
  <ElButton v-else v-bind="$attrs" :type="props?.type as IElButtonAttrs['type']">
    <template v-for="(_, name) in slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </ElButton>
</template>

<script setup lang="ts">
  import { ElButton } from 'element-plus'
  import ButtonMap from './button-map/index.vue'
  import { computed } from 'vue'
  import {
    ITButtonProps,
    ITButtonEmits,
    ITButtonSlots,
    IButtonMapType,
    IElButtonAttrs
  } from './index'

  defineOptions({
    name: 'TButton',
    inheritAttrs: false
  })

  // 继承子组件props类型
  const props = defineProps<ITButtonProps>()

  const slots = defineSlots<ITButtonSlots>()

  const isUnNative = computed(() => ['confirm', 'cancel', 'search'].includes(props?.type || ''))

  defineEmits<ITButtonEmits>()
</script>
