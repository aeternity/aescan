import { useRuntimeConfig } from 'nuxt/app'

export const useNameDetailsStore = defineStore('nameDetails', () => {
  const { blockHeight, keyblocks } = storeToRefs(useRecentBlocksStore())
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const rawName = ref(null)
  const rawNameActions = ref(null)

  const name = computed(() => {
    return rawName.value ? adaptName(rawName.value, blockHeight.value, keyblocks.value?.[0].time) : null
  })
  const nameHash = computed(() => {
    return rawName.value?.hash || rawName.value?.lastBid.tx.nameId
  })
  const nameActions = computed(() => {
    return rawNameActions.value ? adaptNameActions(rawNameActions.value) : null
  })
  const hasNameHistory = computed(() => {
    return !!nameHash.value
  })

  async function fetchNameDetails(id) {
    rawName.value = null
    const [name, auction] = await Promise.all([
      fetchName(id),
      fetchAuction(id),
    ])
    rawName.value = name || auction
  }

  async function fetchName(name) {
    try {
      const { data } = await axios.get(`${MIDDLEWARE_URL}/names/${name}`)
      return data
    } catch (e) {
      return null
    }
  }

  async function fetchAuction(name) {
    try {
      const { data } = await axios.get(`${MIDDLEWARE_URL}/names/auctions/${name}`)
      return data
    } catch (e) {
      return null
    }
  }

  async function fetchNameActions({ nameHash = null, queryParameters = null }) {
    rawNameActions.value = null
    const defaultParameters = `/names/${nameHash}/history`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawNameActions.value = data
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
    rawName,
    rawNameActions,
    name,
    nameHash,
    nameActions,
    hasNameHistory,
    fetchNameDetails,
    fetchNameActions,
    isNameAvailable,
  }
})
