<script lang="tsx">
  import Icon from '@/components/Icon/Icon.vue'
  import { useRootSetting } from '@/hooks/useSetting/useRootSetting'
  import { defineComponent, toRaw, toRefs } from 'vue'
  import { useAsyncRouteStoreWidthOut } from '@/store/modules/asyncRoute'
  import { useNamespace } from '@/hooks/useNamespace'
  import { useRoute } from 'vue-router'
  import { EPIcon } from '@/main'
  import { useAppProviderContext } from '@/components/application/useAppContext'
  export default defineComponent({
    name: 'LayoutAside',
    setup() {
      const route = useRoute()
      const ns = useNamespace('layout-menu')
      const { isOpenSliderRef } = useRootSetting()
      const { isMobile } = toRefs(useAppProviderContext())
      const { getMenus } = useAsyncRouteStoreWidthOut()
      const renderIcon = (icon) => {
        const Icon = EPIcon[icon]
        return Icon && <Icon />
      }
      const renderMenus = (menus, parentPath = '') => {
        return menus.map((item) => {
          const path = `${parentPath ? parentPath + '/' : ''}${item.path}`

          if (item?.children && item?.children?.length > 0) {
            return (
              <el-sub-menu
                index={path}
                key={path}
                class={ns.e('sub-menu')}
                v-slots={{
                  title: () => (
                    <>
                      {item?.meta?.icon && <el-icon>{renderIcon(item?.meta?.icon)}</el-icon>}
                      <span>{item?.meta?.title}</span>
                    </>
                  ),
                  default: () => renderMenus(item.children, path)
                }}
              />
            )
          } else {
            return (
              <el-menu-item
                index={path}
                key={path}
                v-slots={{
                  title: () => <span>{item.meta?.title}</span>,
                  default: () =>
                    item?.meta?.icon && <el-icon>{renderIcon(item?.meta?.icon)}</el-icon>
                }}
              />
            )
          }
        })
      }

      return () => (
        <el-aside class={ns.b()} width="auto">
          <el-menu
            unique-opened
            router
            default-active={route.path}
            class={ns.e('menu')}
            collapse={isOpenSliderRef.value && !isMobile.value}
          >
            <el-menu-item
              index="/login"
              v-slots={{
                title: () => <span>Ting Library</span>,
                default: () => (
                  <el-icon>
                    <Icon icon="logo-ting" size="26" />
                  </el-icon>
                )
              }}
            />
            {renderMenus(toRaw(getMenus))}
          </el-menu>
        </el-aside>
      )
    }
  })
</script>

<style lang="scss">
  @include b(layout-menu) {
    min-height: 100%;
    @include e(menu) {
      &:not(.#{$namespace + '-menu--collapse'}) {
        width: 260px;
        min-height: 100vh;
      }
    }

    @include e(sub-menu) {
      display: grid;
    }
  }
</style>
