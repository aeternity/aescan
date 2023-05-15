import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptStateChannels } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useStateChannelsStore = defineStore('stateChannels', () => {
  const { blockHeight } = storeToRefs(useRecentBlocksStore())
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const rawStateChannels = ref(null)

  const stateChannels = computed(() =>
    rawStateChannels.value
      ? adaptStateChannels(rawStateChannels.value, blockHeight.value)
      : null,
  )

  async function fetchStateChannels() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/channels?&limit=4`)
    rawStateChannels.value = data.data
  }

  return {
    rawStateChannels,
    stateChannels,
    fetchStateChannels,
  }
})
