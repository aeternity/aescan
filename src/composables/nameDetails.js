import { useRuntimeConfig } from 'nuxt/app'

export const useNameDetailsStore = defineStore('nameDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const name = ref(null)
  const nameActions = ref(null)

  const nameHash = computed(() => {
    return name.value.hash
  })

  const hasNameHistory = computed(() => {
    return !!nameHash.value
  })

  async function fetchNameDetails(id) {
    name.value = null
    name.value = await $fetch(`/api/names/${id}`)
  }

  async function fetchNameActions({ nameHash, queryParameters }) {
    nameActions.value = null
    console.log('queryParameters', queryParameters)

    nameActions.value = await $fetch('/api/names/actions', {
      params: {
        queryParameters,
        id: nameHash,
      },
    })
  }

  async function isNameAvailable(name) {
    try {
      await axios.get(`${MIDDLEWARE_URL}/names/${name}`)
      return true
    } catch (error) {
      if (error.response.status === 404) {
        return false
      }
      return null
    }
  }

  return {
    name,
    nameHash,
    nameActions,
    hasNameHistory,
    fetchNameDetails,
    fetchNameActions,
    isNameAvailable,
  }
})
