import { defineStore } from 'pinia'
export const useUiStore = defineStore('ui', () => {
  const isMobileMenuOpen = ref(false)

  return {
    isMobileMenuOpen,
  }
})
