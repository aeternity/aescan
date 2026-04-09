import { useLocalStorage } from '@vueuse/core'

export function usePageLimit(tableKey) {
  return useLocalStorage(`aescan-page-limit-${tableKey}`, PAGINATION_LIMIT)
}
