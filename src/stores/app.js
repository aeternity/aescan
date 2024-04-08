export const useAppStore = defineStore('app', () => {
  const timeFormat = ref('relative')

  function switchTimeFormat() {
    timeFormat.value = timeFormat.value === 'absolute' ? 'relative' : 'absolute'
  }

  return {
    timeFormat,
    switchTimeFormat,
  }
})
