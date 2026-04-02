import type { RouterConfig } from '@nuxt/schema'
import { MENU_HASH } from '@/utils/constants'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (to?.hash === MENU_HASH) {
      return false
    }

    if (to?.hash) {
      return {
        el: to.hash,
        top: 88,
        behavior: to.path === from.path ? 'smooth' : 'auto',
      }
    }

    if (savedPosition) {
      return savedPosition
    }

    if (to.name !== from.name) {
      return {
        top: 0,
      }
    }

    return false
  },
}
