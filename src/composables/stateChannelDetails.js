import { useRuntimeConfig } from 'nuxt/app'

export const useStateChannelDetailsStore = defineStore('stateChannelDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const stateChannelId = ref(null)
  const rawStateChannel = ref(null)
  const rawStateChannelCreateTx = ref(null)
  const rawStateChannelTransactions = ref(null)
  const stateChannelTransactionsCount = ref(null)

  const stateChannelDetails = computed(() => rawStateChannel.value
    ? adaptStateChannelDetails(
      rawStateChannel.value,
      rawStateChannelCreateTx.value,
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
      fetchStateChannelTransactionsCount(),
    ])

    return true
  }

  async function fetchStateChannel() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/channels/${stateChannelId.value}`)
    rawStateChannel.value = data
  }

  async function fetchStateChannelCreateTx() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/channels/${stateChannelId.value}/updates?direction=forward&limit=1`)
    rawStateChannelCreateTx.value = data.data[0]
  }

  async function fetchStateChannelTransactions({ limit, queryParameters } = {}) {
    rawStateChannelTransactions.value = null

    if (queryParameters) {
      const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters}`)
      rawStateChannelTransactions.value = data
      return
    }

    const transactionsUrl = new URL(`${MIDDLEWARE_URL}/v3/transactions`)
    transactionsUrl.searchParams.append('direction', 'backward')
    transactionsUrl.searchParams.append('limit', limit ?? 10)
    transactionsUrl.searchParams.append('channel', stateChannelId.value)

    const { data } = await axios.get(transactionsUrl.toString())
    rawStateChannelTransactions.value = data
  }

  async function fetchStateChannelTransactionsCount() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/transactions/count?id=${stateChannelId.value}`)
    stateChannelTransactionsCount.value = data + 1
  }

  return {
    rawStateChannel,
    rawStateChannelCreateTx,
    rawStateChannelTransactions,
    stateChannelId,
    stateChannelDetails,
    stateChannelTransactions,
    stateChannelTransactionsCount,
    fetchStateChannelDetails,
    fetchStateChannelTransactions,
  }
})
