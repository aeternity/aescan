import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptName, adaptNameActions } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useNameDetailsStore = defineStore('nameDetails', () => {
  const { blockHeight, selectedKeyblock } = storeToRefs(useRecentBlocksStore())

  const rawName = ref(null)
  const rawNameActions = ref(null)

  const name = computed(() => {
    return rawName.value ? adaptName(rawName.value, blockHeight.value, selectedKeyblock.value?.time) : null
  })
  const nameHash = computed(() => {
    return rawName.value?.hash || rawName.value?.info.last_bid.tx.name_id
  })
  const nameActions = computed(() => {
    return rawNameActions.value ? adaptNameActions(rawNameActions.value) : null
  })
  const hasNameHistory = computed(() => {
    return !!nameHash.value
  })

  async function fetchName(name) {
    rawName.value = null
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/names/${name}`)
    rawName.value = data
  }
  async function fetchNameActions({ nameHash = null, queryParameters = null }) {
    rawNameActions.value = null
    const defaultParameters = `/v2/accounts/${nameHash}/activities`
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawNameActions.value = data
  }
  async function isNameAvailable(name) {
    try {
      await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/names/${name}`)
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
