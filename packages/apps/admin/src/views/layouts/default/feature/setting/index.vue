<template>
  <el-drawer v-model="isOpenSettingRef" size="300">
    <template #header>
      <h4> {{ t('layout.settings.title') }} </h4>
    </template>
    <template #default>
      <div :class="ns.b()">
        <SettingTheme />
        <SettingLocale />
        <!--    菜单模式    -->
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
  import SettingLocale from './locale/index.vue'
  import SettingTheme from './theme/index.vue'
  import { useI18n } from '@/hooks/useI18n'
  import { useNamespace } from '@tingcode/system'
  import { useSetting } from '@/hooks/useSetting'

  const ns = useNamespace('setting-drawer')
  const { t } = useI18n()
  const { isOpenSettingRef } = useSetting()
</script>

<style lang="scss" scoped>
  @include b(setting-drawer) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
  }
</style>
