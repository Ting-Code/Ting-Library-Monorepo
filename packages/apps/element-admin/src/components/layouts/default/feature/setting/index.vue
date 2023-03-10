<template>
  <Icon icon="common-setting" @click="handleClick" />
  <el-drawer v-model="isOpenSetting" size="300">
    <template #header>
      <h4> {{ t('layout.settings.title') }} </h4>
    </template>
    <template #default>
      <div :class="ns.b()">
        <!--    主题切换    -->
        <Theme />
        <!--    主题颜色    -->
        <div>aaaaaa</div>
        <div>aaaaaa</div>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Icon } from '@common/components'
  import { useI18n } from '@/locale/use-i18n'
  import { useNamespace } from '@/hooks/use-namespace'
  const { t } = useI18n()

  const isOpenSetting = ref(false)
  const handleClick = () => {
    isOpenSetting.value = true
  }

  const ns = useNamespace('setting-drawer')
</script>

<style scoped lang="scss">
  @include b(setting-drawer) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
