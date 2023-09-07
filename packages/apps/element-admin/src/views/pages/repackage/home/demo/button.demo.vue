<template>
  <TButton
    type="native"
    :attrs="{ type: 'danger', onClick: (e) => console.log('原始按钮', e) }"
    :loading="true"
  >
    <template #loading>loading</template>
  </TButton>
  <TButton type="confirm" @click="(evt) => console.log('确定', evt)" />
  <TButton type="cancel" @click="(e) => console.log('取消', e)" />
  <TButton type="search" @click="(e) => console.log('搜索', e)" @ting="(e) => console.log(e)" />
</template>
<script setup lang="ts">
  import { TButton } from '@tingcli/lib-vue'
</script>
