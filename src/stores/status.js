import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'

export const useStatus = defineStore('status', () => {
  const { MIDDLEWARE_URL, NODE_URL } = useRuntimeConfig().public
  const middlewareVersion = ref(null)
  const nodeVersion = ref(null)

  async function fetchMdwStatus() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/status`)
    middlewareVersion.value = data.mdwVersion
  }

  async function fetchNodeStatus() {
    const { data } = await axios.get(`${NODE_URL}/v3/status`)
    nodeVersion.value = data.nodeVersion
  }

  function fetchStatus() {
    return Promise.all([
      fetchMdwStatus(),
      fetchNodeStatus(),
    ])
  }

  return {
    middlewareVersion,
    nodeVersion,
    fetchStatus,
  }
})
