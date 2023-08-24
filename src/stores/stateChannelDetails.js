import { defineStore, storeToRefs } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptStateChannelDetails, adaptTransactions } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useStateChannelDetailsStore = defineStore('stateChannelDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const { blockHeight } = storeToRefs(useRecentBlocksStore())

  const stateChannelId = ref(null)
  const rawStateChannel = ref(null)
  const rawStateChannelCreateTx = ref(null)
  const rawStateChannelTransactions = ref(null)

  const stateChannelDetails = computed(() => rawStateChannel.value
    ? adaptStateChannelDetails(
      rawStateChannel.value,
      rawStateChannelCreateTx.value,
      blockHeight.value,
    )
    : null,
  )
  const stateChannelTransactions = computed(() => {
    return rawStateChannelTransactions.value
      ? adaptTransactions(rawStateChannelTransactions.value)
      : null
  })

  async function fetchStateChannelDetails(id) {
    stateChannelId.value = id

    await Promise.all([
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
  async function fetchStateChannelTransactions({ limit, queryParameters } = {}) {
    rawStateChannelTransactions.value = null

    if (queryParameters) {
      const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters}`)
      rawStateChannelTransactions.value = data
      return
    }

    const transactionsUrl = new URL(`${MIDDLEWARE_URL}/v2/txs`)
    transactionsUrl.searchParams.append('direction', 'backward')
    transactionsUrl.searchParams.append('limit', limit ?? 10)
    transactionsUrl.searchParams.append('channel', stateChannelId.value)

    const { data } = await axios.get(transactionsUrl.toString())
    rawStateChannelTransactions.value = data
  }

  return {
    rawStateChannel,
    rawStateChannelCreateTx,
    rawStateChannelTransactions,
    stateChannelId,
    stateChannelDetails,
    stateChannelTransactions,
    fetchStateChannelDetails,
    fetchStateChannelTransactions,
  }
})
