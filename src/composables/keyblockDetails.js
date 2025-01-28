export const useKeyblockDetailsStore = defineStore('keyblockDetails', () => {
  const keyblockMicroblocks = ref(null)
  const keyblockDetails = ref(null)

  async function fetchKeyblock(keyblockId) {
    keyblockDetails.value = null
    keyblockDetails.value = await $fetch(`/api/keyblocks/${keyblockId}`)
    // todo splelling 2 words?
  }

  async function fetchKeyblockMicroblocks({ queryParameters, limit, microblockHash, keyblockHash } = {}) {
    keyblockMicroblocks.value = null
    keyblockMicroblocks.value = await $fetch('/api/keyblocks/microblocks', {
      params: { microblockHash, limit, queryParameters, keyblockHash },
    })
  }

  return {
    keyblockDetails,
    keyblockMicroblocks,
    fetchKeyblock,
    fetchKeyblockMicroblocks,
  }
})
