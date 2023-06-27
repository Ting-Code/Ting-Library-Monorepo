<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="matched of breadcrumb" :key="matched.path">
        <el-dropdown>
          <span>
            {{ matched?.meta?.title }}
            <el-icon><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="menu of matched?.menu"
                :key="menu.path"
                :icon="EPIcon[menu?.meta?.icon]"
                @click="handleClickMenu(menu?.path)"
              >
                {{ menu?.meta?.title }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
  import { EPIcon } from '@/main'
  import { ArrowDown } from '@element-plus/icons-vue'
  import { watch, toRaw, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAsyncRouteStoreWidthOut } from '@/store/modules/asyncRoute'

  defineOptions({
    name: 'HeaderBreadcrumb'
  })

  const { getMenus } = useAsyncRouteStoreWidthOut()
  const router = useRouter()
  const breadcrumb = ref<any>(null)

  watch(
    () => router.currentRoute.value.path,
    () => {
      const matched = router.currentRoute.value.matched
      const menus = toRaw(getMenus)

      breadcrumb.value = matched.map((item, index) => {
        if (index > 0) {
          return { ...item, menu: matched[index - 1]?.children }
        }
        return { ...item, menu: menus }
      })
      console.log(breadcrumb)
    },
    { immediate: true }
  )

  const handleClickMenu = (path: string) => {
    router.push(path)
  }
</script>
