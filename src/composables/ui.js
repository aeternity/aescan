export const useUiStore = defineStore('ui', () => {
  const isMobileMenuOpen = ref(false)
  const timeFormat = ref('relative')

  function toggleTimeFormat() {
    timeFormat.value = timeFormat.value === 'absolute' ? 'relative' : 'absolute'
  }

  return {
    isMobileMenuOpen,
    timeFormat,
    toggleTimeFormat,
  }
})
