<template>
  <el-container :class="ns.b()">
    <LayoutFeature />
    <el-container>
      <el-main>
        <main>
          <admin-main />
        </main>
      </el-main>
      <el-footer>
        Footer
        {{ t('layout.settings.title') }}
      </el-footer>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
  import LayoutFeature from './feature/index.vue'
  import AdminMain from './admin-main/index.vue'
  import { useNamespace } from '@/hooks/use-namespace'
  import { useI18n } from '@/locale/use-i18n'
  const { t } = useI18n()

  const ns = useNamespace('default-layout')
</script>

<style scoped lang="scss"></style>
