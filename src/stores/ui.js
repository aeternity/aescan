import { defineStore } from 'pinia'
export const useUiStore = defineStore('ui', () => {
  const isNavigationDrawerOpen = ref(false)

  return {
    isNavigationDrawerOpen,
  }
})
