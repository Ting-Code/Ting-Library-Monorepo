<template>
  <el-drawer v-model="isOpenSettingRef" size="300">
    <template #header>
      <h4> {{ t('layout.settings.title') }} </h4>
    </template>
    <template #default>
      <div :class="ns.b()">
        <!--    主题切换    -->
        <Theme />
        <!--    菜单模式    -->
        <div>aaaaaa</div>
        <!--    菜单模式    -->
        <div>aaaaaa</div>
        <!--    菜单模式    -->
        <div>aaaaaa</div>
        <!--    菜单模式    -->
        <div>aaaaaa</div>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { useI18n } from '@/locale/use-i18n'
  import { useNamespace } from '@/hooks/use-namespace'
  import { useRootSetting } from '@/hooks/use-setting/useRootSetting'
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
