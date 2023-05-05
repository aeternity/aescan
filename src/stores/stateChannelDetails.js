import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptStateChannelDetails } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useStateChannelDetailsStore = defineStore('stateChannelDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const { blockHeight } = storeToRefs(useRecentBlocksStore())

  const stateChannelId = ref(null)
  const rawStateChannel = ref(null)
  const rawStateChannelCreateTx = ref(null)

  const stateChannelDetails = computed(() => rawStateChannel.value
    ? adaptStateChannelDetails(
      rawStateChannel.value,
      rawStateChannelCreateTx.value,
      blockHeight.value,
    )
    : null,
  )

  async function fetchStateChannelDetails(id) {
    stateChannelId.value = id

    await Promise.allSettled([
      fetchStateChannel(),
      fetchStateChannelCreateTx(),
    ])

    return true
  }

  async function fetchStateChannel() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/channels/${stateChannelId.value}`)
    rawStateChannel.value = data
  }

  async function fetchStateChannelCreateTx() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/channels/${stateChannelId.value}/updates?direction=forward&limit=1`)
    rawStateChannelCreateTx.value = data.data[0]
  }

  return {
    rawStateChannel,
    rawStateChannelCreateTx,
    stateChannelId,
    stateChannelDetails,
    fetchStateChannelDetails,
  }
})
