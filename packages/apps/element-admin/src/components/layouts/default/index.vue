<template>
  <el-container :class="ns.b()">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
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
  import AdminMain from './admin-main/index.vue'
  import { useNamespace } from '@/hooks/use-namespace'
  import { useI18n } from '@/locale/use-i18n'
  import { setLocale } from '@/locale/setup-i18n'
  const { t } = useI18n()

  setLocale('en')

  const ns = useNamespace('default-layout')
</script>

<style scoped lang="scss"></style>
