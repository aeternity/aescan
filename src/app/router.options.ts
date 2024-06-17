import type { RouterConfig } from '@nuxt/schema'
import { MENU_HASH } from '../utils/constants'

export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    if (to?.hash !== MENU_HASH && savedPosition) {
      return savedPosition
    }

    return {
      top: 0,
    }
  },
}
