import { useRuntimeConfig } from 'nuxt/app'
import { defineStore, storeToRefs } from 'pinia'
import useAxios from '@/composables/useAxios'
import { adaptStateChannels } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useStateChannelsStore = defineStore('stateChannels', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const { blockHeight } = storeToRefs(useRecentBlocksStore())

  const rawStateChannels = ref(null)
  const stateChannelsCount = ref(null)
  const stateChannels = computed(() => {
    return rawStateChannels.value
      ? adaptStateChannels(rawStateChannels.value, blockHeight.value)
      : null
  })

  async function fetchStateChannels({ limit, queryParameters } = {}) {
    rawStateChannels.value = null
    if (queryParameters) {
      const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters}`)
      rawStateChannels.value = data
      return
    }

    const channelsUrl = new URL(`${MIDDLEWARE_URL}/v2/channels`)
    channelsUrl.searchParams.append('limit', limit ?? 10)

    const { data } = await axios.get(channelsUrl.toString())
    rawStateChannels.value = data
  }

  async function fetchStateChannelsCount() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/txs/count?tx_type=channel_create`)
    this.stateChannelsCount = data
  }

  return {
    fetchStateChannelsCount,
    stateChannelsCount,
    fetchStateChannels,
    stateChannels,
  }
})
