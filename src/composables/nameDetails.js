export const useNameDetailsStore = defineStore('nameDetails', () => {
  const name = ref(null)
  const nameHistory = ref(null)

  const hasNameHistory = computed(() => !!name.value?.hash)
  const hasCustomPointers = computed(() => name.value?.active && !!name.value?.customPointers?.length)

  async function fetchNameDetails(id) {
    name.value = null
    const data = await $fetch(`/api/names/${id}`)
    if (data.error === 404) {
      throw showError({
        data: {
          entityId: id,
          entityName: 'Name',
        },
        statusMessage: 'EntityDetailsNotFound',
      })
    } else {
      name.value = data
    }
  }

  async function fetchNameHistory({ nameHash, queryParameters }) {
    nameHistory.value = null
    nameHistory.value = await $fetch('/api/names/history', {
      params: {
        queryParameters,
        id: nameHash,
      },
    })
  }

  return {
    name,
    nameHistory,
    hasNameHistory,
    hasCustomPointers,
    fetchNameDetails,
    fetchNameHistory,
  }
})
