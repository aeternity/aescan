import { defineStore, storeToRefs } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptName, adaptNameActions } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

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
    return rawName.value?.hash || rawName.value?.info.lastBid.tx.nameId
  })
  const nameActions = computed(() => {
    return rawNameActions.value ? adaptNameActions(rawNameActions.value) : null
  })
  const hasNameHistory = computed(() => {
    return !!nameHash.value
  })

  async function fetchName(name) {
    rawName.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/names/${name}`)
    rawName.value = data
  }

  async function fetchNameActions({ nameHash = null, queryParameters = null }) {
    rawNameActions.value = null
    const defaultParameters = `/v3/names/${nameHash}/history`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawNameActions.value = data
  }

  async function isNameAvailable(name) {
    try {
      await axios.get(`${MIDDLEWARE_URL}/v3/names/${name}`)
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
    fetchName,
    fetchNameActions,
    isNameAvailable,
  }
})
