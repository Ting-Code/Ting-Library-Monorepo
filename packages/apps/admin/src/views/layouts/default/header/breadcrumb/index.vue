<template>
  <el-breadcrumb :class="ns.b()" separator="/">
    <el-breadcrumb-item v-for="(matched, index) of breadcrumb" :key="index">
      <el-dropdown>
        <span :class="ns.e('title')">
          {{ matched?.meta?.title }}
          <el-icon style="margin-left: 3px"> <ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="menu of matched?.menu"
              :key="menu.path"
              :icon="EPIcon[menu?.meta?.icon]"
              @click="handleClickMenu(menu)"
            >
              {{ menu?.meta?.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
  import { EPIcon } from '@/main'
  import { ArrowDown } from '@element-plus/icons-vue'
  import { toRaw, ref } from 'vue'
  import { useUserStoreWidthOut } from '@/store/modules/user'
  import { setUrl, useNamespace, onMittRouter } from '@tingcode/system'
  import { IMenu } from '@tingcode/system/apiSystem'

  defineOptions({
    name: 'HeaderBreadcrumb'
  })
  const ns = useNamespace('header-breadcrumb')
  const { getMenu } = useUserStoreWidthOut()
  const breadcrumb = ref<any>(null)

  onMittRouter((route) => {
    const matched = route.matched
    const menus = toRaw(getMenu)
    if (matched[0] && matched[0].path !== '/:path(.*)*') {
      breadcrumb.value = matched.map((item, index) => {
        if (index > 0) {
          return { ...item, menu: matched[index - 1]?.children }
        }
        return { ...item, menu: menus }
      })
    }
  })
  const handleClickMenu = (menu: IMenu) => {
    let menuItem = menu
    if (menu.children && menu.children.length > 0) {
      menuItem = menu.children[0]
    }
    setUrl({ path: menuItem.path, name: menuItem?.meta?.module })
  }
</script>

<style lang="scss">
  @include b(header-breadcrumb) {
    display: flex;
    margin-left: 18px;
    white-space: nowrap;
    flex-wrap: nowrap;

    @include e(title) {
      vertical-align: middle;
      display: flex;
    }
  }
</style>
