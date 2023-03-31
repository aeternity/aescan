import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptName, adaptNameActions } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useNameDetailsStore = defineStore('nameDetails', {
  state: () => ({
    rawName: null,
    rawNameActions: null,
  }),
  getters: {
    name(state) {
      const { blockHeight, selectedKeyblock } = useRecentBlocksStore()
      return state.rawName ? adaptName(state.rawName, blockHeight, selectedKeyblock?.time) : null
    },
    nameHash(state) {
      return state.rawName?.hash || state.rawName?.info.last_bid.tx.name_id
    },
    nameActions(state) {
      const { blockHeight } = useRecentBlocksStore()
      return state.rawNameActions ? adaptNameActions(state.rawNameActions, blockHeight) : null
    },
    hasNameHistory() {
      return !!this.nameHash
    },
  },
  actions: {
    async fetchName(name) {
      this.rawName = null

      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/names/${name}`)
      this.rawName = data
    },
    async isNameAvailable(name) {
      try {
        await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/names/${name}`)
        return true
      } catch (error) {
        if (error.response.status === 404) {
          return false
        }
        return null
      }
    },
    async fetchNameActions({ nameHash = null, queryParameters = null }) {
      this.rawNameActions = null
      const defaultParameters = `/v2/accounts/${nameHash}/activities`
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
      this.rawNameActions = data
    },
  },
})
