import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { defineStore, storeToRefs } from 'pinia'
import { adaptStateChannels } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useStateChannelsStore = defineStore('stateChannels', () => {
  const rawStateChannels = ref(null)

  const { blockHeight } = storeToRefs(useRecentBlocksStore())

  const stateChannels = computed(() => {
    return rawStateChannels.value
      ? adaptStateChannels(rawStateChannels.value, blockHeight.value)
      : null
  })

  async function fetchStateChannels({ limit, queryParameters } = {}) {
    rawStateChannels.value = null
    if (queryParameters) {
      const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters}`)
      rawStateChannels.value = data
      return
    }

    const channelsUrl = new URL(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/channels`)
    channelsUrl.searchParams.append('limit', limit ?? 10)

    const { data } = await axios.get(channelsUrl.toString())
    rawStateChannels.value = data
  }

  return {
    fetchStateChannels,
    stateChannels,
  }
})
