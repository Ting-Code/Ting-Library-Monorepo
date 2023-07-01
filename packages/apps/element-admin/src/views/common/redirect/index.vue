<script lang="tsx">
  import { defineComponent } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

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

      if (_redirect_type === 'name') {
        router.replace({
          name: _path,
          query,
          params: JSON.parse((params._origin_params as string) ?? '{}')
        })
      } else {
        router.replace({
          path: _path.startsWith('/') ? _path : '/' + _path,
          query
        })
      }

      return () => <el-empty description="无内容" />
    }
  })
</script>
