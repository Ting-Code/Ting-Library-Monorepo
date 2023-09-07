<script lang="tsx">
  import { defineComponent, useAttrs } from 'vue'
  import { IButtonMapType } from '../index'
  import { ElButton } from 'element-plus'
  import { Search } from '@element-plus/icons-vue'
  export default defineComponent({
    props: {
      type: {
        type: String as PropType<IButtonMapType>,
        required: true
      }
    },
    setup(props) {
      const attrs = useAttrs()
      const buttonComponentMap = {
        confirm: (
          <ElButton type="primary" {...attrs}>
            确认
          </ElButton>
        ),
        cancel: <ElButton {...attrs}>取消</ElButton>,
        search: (
          <ElButton type="primary" icon={Search} {...attrs}>
            搜索
          </ElButton>
        )
      }

      const ButtonComponent = () => buttonComponentMap[props?.type]

      return () => <ButtonComponent />
    }
  })
</script>
