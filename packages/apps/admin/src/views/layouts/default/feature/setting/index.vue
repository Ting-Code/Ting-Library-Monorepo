<template>
  <el-drawer v-model="isOpenSettingRef" size="300">
    <template #header>
      <h4> {{ t('layout.settings.title') }} </h4>
    </template>
    <template #default>
      <div :class="ns.b()">
        <el-divider>主题</el-divider>
        <HeaderTheme />
        <!--    菜单模式    -->
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
  import HeaderTheme from '../../theme/index.vue'
  import { useI18n } from '@/locale/use-i18n'
  import { useNamespace } from '@/hooks/useNamespace'
  import { useRootSetting } from '@/hooks/useSetting/useRootSetting'
  const ns = useNamespace('setting-drawer')
  const { t } = useI18n()
  const { isOpenSettingRef } = useRootSetting()
</script>

<style lang="scss" scoped>
  @include b(setting-drawer) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
