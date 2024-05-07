<script lang="tsx">
  import Icon from '@/components/icon/icon.vue'
  import { defineComponent } from 'vue'
  import { useNamespace } from '@/hooks/useNamespace'
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

      return () => (
        <div class={ns.b()}>
          {[...props.tree].map((item) => {
            return (
              <a class={`title-${item.tag.toLowerCase()}`} key={item.id} href={`#${item.id}`}>
                <Icon icon={`layout-${item.tag.toLowerCase()}`} size="20" />
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
    max-width: 260px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    .title-h1,
    .title-h2,
    .title-h3,
    .title-h4,
    .title-h5 {
      overflow: hidden;
      text-overflow: ellipsis;
      flex-wrap: nowrap;
      white-space: nowrap;
      padding-bottom: 6px;
      > span {
        padding-left: 5px;
      }
    }
    .title-h1 {
      padding: 8px;
      color: getCssVar(text-color, primary);
      font-size: 20px;
      font-weight: getCssVar(font-weight-bold);
    }
    .title-h2 {
      color: getCssVar(text-color, primary);
      font-size: 18px;
      font-weight: getCssVar(font-weight-bold);
      padding-left: 8px;
    }
    .title-h3 {
      color: getCssVar(text-color, regular);
      font-size: 16px;
      padding-left: 16px;
    }
    .title-h4 {
      color: getCssVar(text-color, regular);
      font-size: 15px;
      padding-left: 26px;
    }
    .title-h5 {
      color: getCssVar(text-color, regular);
      font-size: 15px;
      padding-left: 32px;
    }
  }
</style>
