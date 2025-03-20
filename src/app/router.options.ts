import type { RouterConfig } from '@nuxt/schema'
import { MENU_HASH } from '@/utils/constants'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (to?.hash !== MENU_HASH && savedPosition) {
      return savedPosition
    }
    if (to.name !== from.name) {
      return {
        top: 0,
      }
    }

    return {
      savedPosition,
    }
  },
}
