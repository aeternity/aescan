import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { defineStore, storeToRefs } from 'pinia'
import { adaptStateChannels2 } from '~/utils/adapters'
import { useRecentBlocksStore } from '~/stores/recentBlocks'
// todo imports

export const useStateChannelsStore = defineStore('stateChannels', () => {
  const rawStateChannels = ref(null)
  const { blockHeight } = storeToRefs(useRecentBlocksStore())

  const stateChannels = computed(() => {
    return rawStateChannels.value
      ? adaptStateChannels2(rawStateChannels.value, blockHeight.value)
      : null
  })

  async function fetchStateChannels(queryParameters = null) {
    console.log('fetchStateChannels')
    // todo better import
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || '/v2/channels?&limit=10'}`)
    this.rawStateChannels = data.data
    console.log('data', data)
    rawStateChannels.value = data
  }

  return {
    fetchStateChannels,
    stateChannels,
  }
})
