import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptDashboardStateChannels } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useDashboardStateChannelsStore = defineStore('dashboardStateChannels', {
  state: () => ({
    rawStateChannels: null,
  }),
  getters: {
    stateChannels(state) {
      const store = useRecentBlocksStore()
      return state.rawStateChannels
        ? adaptDashboardStateChannels(state.rawStateChannels, store.blockHeight)
        : null
    },
  },
  actions: {
    async fetchStateChannels() {
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/channels?&limit=4`)
      this.rawStateChannels = data.data
    },
  },
})
