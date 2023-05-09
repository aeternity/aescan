import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { defineStore, storeToRefs } from 'pinia'
import { adaptStateChannels } from '~/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useStateChannelsStore = defineStore('stateChannels', () => {
  const rawStateChannels = ref(null)
  const stateChannelsCount = ref(null)

  const { blockHeight } = storeToRefs(useRecentBlocksStore())

  const stateChannels = computed(() => {
    return rawStateChannels.value
      ? adaptStateChannels(rawStateChannels.value, blockHeight.value)
      : null
  })

  async function fetchStateChannels(queryParameters = null) {
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || '/v2/channels?&limit=10'}`)
    this.rawStateChannels = data.data
    rawStateChannels.value = data
  }

  async function fetchStateChannelsCount() {
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/txs/count?tx_type=channel_create`)
    this.stateChannelsCount = data
  }

  return {
    fetchStateChannelsCount,
    stateChannelsCount,
    fetchStateChannels,
    stateChannels,
  }
})
