import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { SYNCING_BLOCK_THRESHOLD } from '@/utils/constants'

export const useStatus = defineStore('status', () => {
  const { MIDDLEWARE_URL, NODE_URL } = useRuntimeConfig().public

  const axios = useAxios()
  const middlewareStatus = ref(null)
  const nodeStatus = ref(null)

  async function fetchMdwStatus() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/status`)
    middlewareStatus.value = data
  }

  async function fetchNodeStatus() {
    const { data } = await axios.get(`${NODE_URL}/v3/status`)
    nodeStatus.value = data
  }

  const isSyncing = computed(() => {
    return middlewareStatus.value && nodeStatus.value
      ? middlewareStatus.value.mdwSyncing &&
      (nodeStatus.value.topBlockHeight - middlewareStatus.value.nodeHeight) > SYNCING_BLOCK_THRESHOLD
      : null
  })

  function fetchStatus() {
    return Promise.all([
      fetchMdwStatus(),
      fetchNodeStatus(),
    ])
  }

  return {
    middlewareStatus,
    nodeStatus,
    isSyncing,
    fetchStatus,
  }
})
