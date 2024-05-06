export const useAppStore = defineStore('app', () => {
  const timeFormat = ref('relative')

  function toggleTimeFormat() {
    timeFormat.value = timeFormat.value === 'absolute' ? 'relative' : 'absolute'
  }

  return {
    timeFormat,
    toggleTimeFormat,
  }
})
