import { defineStore, storeToRefs } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { useRecentBlocksStore } from '~/stores/recentBlocks'
import { SYNCING_BLOCK_THRESHOLD } from '~/utils/constants'

export const useStatus = defineStore('status', () => {
  const { MIDDLEWARE_URL, NODE_URL } = useRuntimeConfig().public
  const { blockHeight } = storeToRefs(useRecentBlocksStore())

  const axios = useAxios()
  const middlewareStatus = ref(null)
  const nodeVersion = ref(null)

  async function fetchMdwStatus() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/status`)
    middlewareStatus.value = data
  }

  async function fetchNodeStatus() {
    const { data } = await axios.get(`${NODE_URL}/v3/status`)
    nodeVersion.value = data.nodeVersion
  }

  const isSyncing = computed(() => {
    return middlewareStatus.value && blockHeight.value
      ? middlewareStatus.value.mdwSyncing &&
      (blockHeight.value - middlewareStatus.value.nodeHeight) > SYNCING_BLOCK_THRESHOLD
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
    nodeVersion,
    isSyncing,
    fetchStatus,
  }
})
