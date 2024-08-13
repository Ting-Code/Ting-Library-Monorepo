<script lang="tsx">
  import Icon from '@/components/icon/icon.vue'
  import { useSetting } from '@/hooks/useSetting'
  import { defineComponent, toRaw, toRefs } from 'vue'
  import { useUserStoreWidthOut } from '@/store/modules/user'
  import { useNamespace } from '@tingcode/system'
  import { useRoute } from 'vue-router'
  import { EPIcon } from '@/main'
  import { useAppProviderContext } from '@/views/application/useAppContext'
  export default defineComponent({
    name: 'LayoutAside',
    setup() {
      const route = useRoute()
      const ns = useNamespace('layout-menu')
      const { isOpenSliderRef } = useSetting()
      const { isMobile } = toRefs(useAppProviderContext())
      const { getMenu } = useUserStoreWidthOut()
      const renderIcon = (icon) => {
        const ELIcon = EPIcon?.[icon]
        return ELIcon ? <ELIcon /> : <Icon icon={icon} />
      }
      const renderMenus = (menus, parentPath = '') => {
        return menus.map((item) => {
          const path = `${parentPath ? parentPath + '/' : ''}${item.path}`

          if (item?.children && item?.children?.length > 0) {
            return (
              <el-sub-menu
                index={item.name}
                key={item.name}
                disabled={!!item.meta.disabled}
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
                index={item.path}
                key={item.path}
                disabled={!!item.meta.disabled}
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
            {renderMenus(toRaw(getMenu))}
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
