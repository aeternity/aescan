export const useKeyblockDetailsStore = defineStore('keyblockDetails', () => {
  const keyblockMicroblocks = ref(null)
  const keyblockDetails = ref(null)

  async function fetchKeyblock(id) {
    keyblockDetails.value = null
    keyblockDetails.value = await $fetch(`/api/keyblocks/${id}`)
  }

  async function fetchKeyblockMicroblocks({ queryParameters, limit, microblockHash, id } = {}) {
    keyblockMicroblocks.value = null
    keyblockMicroblocks.value = await $fetch('/api/keyblocks/microblocks', {
      params: { microblockHash, limit, queryParameters, id },
    })
    console.log('keyblockMicroblocks.value', keyblockMicroblocks.value)
  }

  return {
    keyblockDetails,
    keyblockMicroblocks,
    fetchKeyblock,
    fetchKeyblockMicroblocks,
  }
})
