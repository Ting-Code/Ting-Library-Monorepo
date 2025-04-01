<template>
  <ButtonMap v-if="isUnNative" :type="props?.type as IButtonMapType" v-bind="$attrs" />
  <ElButton v-else v-bind="$attrs" :type="props?.type as IElButtonAttrs['type']">
    <template v-for="(_, name) in slots" #[name]="native">
      <slot :name="name" v-bind="native || {}"></slot>
    </template>
  </ElButton>
</template>

<script setup lang="ts">
  import { ElButton } from 'element-plus'
  import ButtonMap from './button-map/index.vue'
  import { computed } from 'vue'
  import {
    ReButtonProps,
    ReButtonSlots,
    IButtonMapType,
    IElButtonAttrs,
    ReButtonEmits
  } from './index'

  defineOptions({
    name: 'REButton',
    inheritAttrs: false
  })

  // 继承子组件props类型
  const props = withDefaults(defineProps<ReButtonProps>(), {})

  const slots = defineSlots<ReButtonSlots>()

  const isUnNative = computed(() => ['confirm', 'cancel', 'search'].includes(props?.type || ''))

  defineEmits<ReButtonEmits>()
</script>
