import { defineStore } from 'pinia'
import { SYNCING_BLOCK_THRESHOLD } from '@/utils/constants'

export const useStatus = defineStore('status', () => {
  const middlewareStatus = ref(null)
  const nodeStatus = ref(null)

  // todo DULTEZITY KONCEPT pokud to muzu udelat jako computed tak do storu s tim
  // TODO CONCPT OF LOADING  = startup API

  const isSyncing = computed(() => {
    // todo shorten
    return middlewareStatus.value && nodeStatus.value
      ? middlewareStatus.value.mdwSyncing && (nodeStatus.value.topBlockHeight - middlewareStatus.value.nodeHeight) > SYNCING_BLOCK_THRESHOLD : null
  })

  async function fetchStatus() {
    // todo ok like this or separate?
    [middlewareStatus.value, nodeStatus.value] = await $fetch(`/api/status`)
  }

  return {
    middlewareStatus, nodeStatus, isSyncing, fetchStatus,
  }
})
