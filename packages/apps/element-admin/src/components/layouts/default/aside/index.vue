<script lang="tsx">
  import { Icon } from '@common/components'
  import { useRootSetting } from '@/hooks/useSetting/useRootSetting'
  import { defineComponent, toRaw } from 'vue'
  import { useAsyncRouteStoreWidthOut } from '@/store/modules/asyncRoute'
  import { useNamespace } from '@/hooks/useNamespace'

  export default defineComponent({
    name: 'LayoutAside',
    setup() {
      const ns = useNamespace('layout-menu')
      const { isOpenSliderRef } = useRootSetting()
      const { getMenus } = useAsyncRouteStoreWidthOut()

      const renderMenus = (menus) => {
        return menus.map((item) => {
          if (item?.children && item?.children?.length > 0) {
            return (
              <el-sub-menu
                index={item.path}
                key={item.path}
                class={ns.e('sub-menu')}
                v-slots={{
                  title: () => (
                    <>
                      <el-icon>
                        <Icon icon={`menu-${item?.meta?.icon || 'default'}`} size="18" />
                      </el-icon>
                      <span>{item?.meta?.title}</span>
                    </>
                  ),
                  default: () => renderMenus(item.children)
                }}
              />
            )
          } else {
            return (
              <el-menu-item
                index={item.path}
                key={item.path}
                v-slots={{
                  title: () => <span>{item.meta?.title}</span>,
                  default: () => (
                    <el-icon>
                      <Icon icon={`menu-${item?.meta?.icon || 'default'}`} size="18" />
                    </el-icon>
                  )
                }}
              />
            )
          }
        })
      }

      return () => (
        <el-aside class={ns.b()} width="auto">
          <el-menu class={ns.e('menu')} collapse={isOpenSliderRef.value}>
            <el-menu-item
              index="ting"
              v-slots={{
                title: () => <span>Ting admin</span>,
                default: () => (
                  <el-icon>
                    <Icon icon="common-ting" size="26" />
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
    @include e(menu) {
      &:not(.#{$namespace + '-menu--collapse'}) {
        width: 200px;
        min-height: 100%;
      }
    }

    @include e(sub-menu) {
      display: grid;
    }
  }
</style>
