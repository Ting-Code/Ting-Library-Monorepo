import { computed, toValue } from 'vue'
import { useRouter } from 'vue-router'

/**
 * @description: Full screen display content 全屏显示
 */
export const useFullContent = () => {
  const router = useRouter()
  const { currentRoute } = router

  // Whether to display the content in full screen without displaying the menu
  const isFullContentRef = computed(() => {
    const route = toValue(currentRoute)
    const query = route.query
    return query && Reflect.has(query, '__full__')
  })

  return { isFullContentRef }
}
