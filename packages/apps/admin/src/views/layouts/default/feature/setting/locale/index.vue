<template>
  <template v-if="showLocalePicker">
    <el-divider>{{ t('layout.settings.locale') }}</el-divider>
    <el-select v-model="currentLocale" :class="ns.e('select')">
      <el-option
        v-for="item in localeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </template>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useNamespace } from '@tingcode/system'
  import { useI18n, useLocale } from '@/hooks/useI18n'
  import type { LocaleType } from '@tingcode/i18n'

  const ns = useNamespace('setting-locale')
  const { t } = useI18n()
  const { locale, localeLabel, availableLocales, showLocalePicker, changeLocale } = useLocale()

  const currentLocale = computed({
    get: () => locale.value,
    set: (value: LocaleType) => {
      if (value && value !== locale.value) void changeLocale(value)
    }
  })

  const localeOptions = computed(() =>
    availableLocales.value.map((code) => ({
      value: code,
      label: localeLabel(code)
    }))
  )

  defineOptions({
    name: 'SettingLocale'
  })
</script>

<style lang="scss" scoped>
  @include b(setting-locale) {
    @include e(select) {
      width: 100%;
    }
  }
</style>
