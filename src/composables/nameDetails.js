export const useNameDetailsStore = defineStore('nameDetails', () => {
  const name = ref(null)
  const nameActions = ref(null)

  const hasNameHistory = computed(() => !!name.value.hash)
  const hasCustomPointers = computed(() => name.value?.active && !!name.value?.customPointers?.length)

  async function fetchNameDetails(id) {
    name.value = null
    name.value = await $fetch(`/api/names/${id}`)
  }

  async function fetchNameActions({ nameHash, queryParameters }) {
    nameActions.value = null
    nameActions.value = await $fetch('/api/names/actions', {
      params: {
        queryParameters,
        id: nameHash,
      },
    })
  }

  return {
    name,
    nameActions,
    hasNameHistory,
    hasCustomPointers,
    fetchNameDetails,
    fetchNameActions,
  }
})
