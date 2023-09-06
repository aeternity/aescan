import type { RouterConfig } from '@nuxt/schema'
import { NAVIGATION_HASH } from '../utils/constants'

export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    if (to?.hash !== NAVIGATION_HASH && savedPosition) {
      return savedPosition
    }

    return {
      top: 0,
    }
  },
}