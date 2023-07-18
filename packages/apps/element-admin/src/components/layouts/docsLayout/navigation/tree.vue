<script lang="tsx">
  import Icon from '@/components/Icon/Icon.vue'
  import { useRootSetting } from '@/hooks/useSetting/useRootSetting'
  import { defineComponent, toRefs } from 'vue'
  import { useNamespace } from '@/hooks/useNamespace'
  import { useAppProviderContext } from '@/components/application/useAppContext'
  export default defineComponent({
    name: 'DocsTree',
    props: {
      tree: {
        type: Array as PropType<{ tag: string; text: string; id: string }[]>,
        required: true
      }
    },
    setup(props) {
      const ns = useNamespace('docs-tree')
      const { isOpenSliderRef } = useRootSetting()
      const { isMobile } = toRefs(useAppProviderContext())
      console.log(isOpenSliderRef, isMobile)

      return () => (
        <div class={ns.b()}>
          {[...props.tree].map((item) => {
            return (
              <a class={`${item.tag.toLowerCase()}`} key={item.id} href={`#${item.id}`}>
                <Icon icon={`layout-${item.tag.toLowerCase()}`} />
                <span>{item.text}</span>
              </a>
            )
          })}
        </div>
      )
    }
  })
</script>

<style lang="scss">
  @include b(docs-tree) {
    max-width: 230px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    .h1,
    .h2,
    .h3,
    .h4,
    .h5 {
      overflow: hidden;
      text-overflow: ellipsis;
      flex-wrap: nowrap;
      white-space: nowrap;
    }
  }
</style>
