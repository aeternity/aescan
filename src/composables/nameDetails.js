export const useNameDetailsStore = defineStore('nameDetails', () => {
  const name = ref(null)
  const nameHistory = ref(null)

  const hasNameHistory = computed(() => !!name.value.hash)
  const hasCustomPointers = computed(() => name.value?.active && !!name.value?.customPointers?.length)

  async function fetchNameDetails(id) {
    name.value = null
    name.value = await $fetch(`/api/names/${id}`)
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
