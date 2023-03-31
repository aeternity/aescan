import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptActiveNames, adaptChainNames, adaptExpiredNames, adaptInAuctionNames } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useNamesStore = defineStore('names', {
  state: () => ({
    rawActiveNames: null,
    rawInAuctionNames: null,
    rawExpiredNames: null,
    rawRecentlyActivatedNames: null,
  }),
  getters: {
    activeNames: state => {
      const store = useRecentBlocksStore()
      return state.rawActiveNames
        ? adaptActiveNames(state.rawActiveNames, store.blockHeight)
        : null
    },
    inAuctionNames: state => {
      const store = useRecentBlocksStore()
      return state.rawInAuctionNames
        ? adaptInAuctionNames(state.rawInAuctionNames, store.blockHeight)
        : null
    },
    auctionsEndingSoon() {
      return this.inAuctionNames?.data.slice(0, 4)
    },
    expiredNames: state => {
      const store = useRecentBlocksStore()
      return state.rawExpiredNames
        ? adaptExpiredNames(state.rawExpiredNames, store.blockHeight)
        : null
    },
    recentlyActivatedNames: state => {
      const store = useRecentBlocksStore()
      return state.rawRecentlyActivatedNames
        ? adaptChainNames(state.rawRecentlyActivatedNames, store.blockHeight)
        : null
    },
  },
  actions: {
    fetchNamesDetails({ limit }) {
      this.fetchActiveNames({ limit })
      this.fetchInAuctionNames({ limit })
      this.fetchExpiredNames({ limit })
    },
    async fetchActiveNames({ queryParameters, limit } = {}) {
      const { data } = await axios.get(
        `${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || `/v2/names?state=active&expand=true&by=deactivation&direction=forward&limit=${limit ?? 10}`}`,
      )
      this.rawActiveNames = data
    },

    async fetchInAuctionNames({ queryParameters, limit } = {}) {
      const { data } = await axios.get(
        `${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || `/v2/names/auctions?by=expiration&direction=forward&limit=${limit ?? 10}`}`,
      )
      this.rawInAuctionNames = data
    },

    async fetchExpiredNames({ queryParameters, limit } = {}) {
      const { data } = await axios.get(
        `${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || `/v2/names?state=inactive&expand=true&limit=${limit ?? 10}`}`,
      )
      this.rawExpiredNames = data
    },
    async fetchRecentlyActivatedNames() {
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/names?state=active&by=activation&direction=backward&limit=4&expand=true&by=activation`)
      this.rawRecentlyActivatedNames = data.data
    },
  },
})
