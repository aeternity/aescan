export const useKeyblockStore = defineStore('keyblocks', () => {
  const keyblocks = ref(null)
  const keyblocksCount = ref(null)

  async function fetchKeyblocks(queryParameters) {
    keyblocks.value = null
    const data = await $fetch('/api/keyblocks', {
      params: { queryParameters },
    })
    keyblocks.value = data
    keyblocksCount.value = data.data[0].block
  }

  return {
    keyblocks,
    keyblocksCount,
    fetchKeyblocks,
  }
})
