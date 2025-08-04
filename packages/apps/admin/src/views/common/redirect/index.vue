<script lang="tsx">
  import { defineComponent, nextTick } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { setUrl } from '@tingcode/system'
  export default defineComponent({
    name: 'Redirect',
    setup() {
      const route = useRoute()
      const router = useRouter()

      const { params, query } = route
      const { path, _redirect_type = 'path' } = params

      Reflect.deleteProperty(params, '_redirect_type')
      Reflect.deleteProperty(params, 'path')

      const _path = Array.isArray(path) ? path.join('/') : path

      nextTick(() => {
        if (_redirect_type === 'path') {
          setUrl({
            path: _path.startsWith('/') ? _path : '/' + _path,
            query
          })
        } else {
          router.replace({
            name: _path,
            query,
            params: JSON.parse((params._origin_params as string) ?? '{}')
          })
        }
      })

      return () => <el-empty description="无内容" style={{ height: '100%' }} v-loading={true} />
    }
  })
</script>
