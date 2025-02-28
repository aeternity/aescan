export const useKeyblockStore = defineStore('keyblocks', () => {
  const keyblocks = ref(null)
  const keyblocksCount = ref(null)

  async function fetchKeyblocks({ queryParameters = null, limit = null } = {}) {
    keyblocks.value = null
    const data = await $fetch('/api/keyblocks', {
      params: {
        queryParameters,
        limit,
      },
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
