<template>
  <router-view />
</template>

<script lang="ts" setup>
  import { emitMittRouter } from '@tingcode/system'

  if (!window.__isOneRouter__) {
    window.__isOneRouter__ = true
    emitMittRouter(window.location.href)
  }
</script>
