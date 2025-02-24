export const useKeyblockDetailsStore = defineStore('keyblockDetails', () => {
  const keyblockMicroblocks = ref(null)
  const keyblockDetails = ref(null)

  async function fetchKeyblock(id) {
    keyblockDetails.value = null
    const data = await $fetch(`/api/keyblocks/${id}`)
    console.log('data', data)
    console.log('data?.error === 400', data?.error === 400)
    if (data?.error === 400) {
      throw showError({
        data: {
          entityId: id,
          entityName: 'Keyblock',
        },
        statusMessage: 'EntityDetailsNotFound',
      })
    } else {
      keyblockDetails.value = data
    }
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
