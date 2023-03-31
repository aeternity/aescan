import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'

export const useStatus = defineStore('status', {
  state: () => ({
    middlewareVersion: null,
    nodeVersion: null,
  }),

  actions: {
    async fetchStatus() {
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/status`)
      this.middlewareVersion = data.mdw_version
      this.nodeVersion = data.node_version
    },
  },
})
