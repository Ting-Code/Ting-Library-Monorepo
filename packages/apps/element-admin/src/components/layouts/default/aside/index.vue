<script lang="tsx">
  import { Icon } from '@common/components'
  import { useRootSetting } from '@/hooks/useSetting/useRootSetting'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'LayoutAside',
    setup() {
      const { isOpenSliderRef } = useRootSetting()

      return () => (
        <el-aside width="auto">
          <el-menu default-active="2" collapse={isOpenSliderRef.value}>
            <el-menu-item index="0">
              <Icon icon="common-ting" size="38" />
            </el-menu-item>
          </el-menu>
        </el-aside>
      )
    }
  })
</script>
