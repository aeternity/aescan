import { useRuntimeConfig } from 'nuxt/app'
import { Contract } from '@aeternity/aepp-sdk'
import { TOKEN_SUPPLY_ACI } from '@/utils/constants'

export const useTokenDetailsStore = defineStore('tokenDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const { aeSdk } = storeToRefs(useWalletStore())
  const { fetchPrice } = useDexStore()
  const featureFlags = useFeatureFlags()

  const tokenId = ref(null)
  const price = ref(null)
  const rawTokenEvents = ref(null)
  const tokenEventsCount = ref(null)

  const rawToken = ref(null)
  const rawTotalSupply = ref(null)
  const rawTokenHolders = ref(null)
  const tokenHoldersCount = ref(null)
  const rawTokenTrades = ref(null)

  const tokenDetails = computed(() => rawToken.value
    ? adaptTokenDetails(
      rawToken.value,
      rawTotalSupply.value,
      price.value,
    )
    : null,
  )

  const tokenHolders = computed(() =>
    tokenDetails.value && rawTokenHolders.value
      ? adaptTokenHolders(
        rawTokenHolders.value,
        tokenDetails.value,
      )
      : null,
  )

  const tokenEvents = computed(() =>
    rawTokenEvents.value
      ? adaptTokenEvents(rawTokenEvents.value)
      : null,
  )

  const tokenTrades = computed(() => rawTokenTrades.value
    ? adaptTrades(rawTokenTrades.value, price.value)
    : null,
  )

  function fetchTokenDetails(id) {
    tokenId.value = id

    const tokenPromise = fetchToken()

    return Promise.all([
      tokenPromise,
      Promise.allSettled([
        fetchTotalSupply(),
        tokenPromise.then(() => fetchTokenPrice()),
      ]),
    ])
  }

  async function fetchTokenPrice() {
    if (!featureFlags.dex) {
      return
    }

    price.value = await fetchPrice(tokenId.value, rawToken.value.decimals)
  }

  async function fetchToken() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/aex9/${tokenId.value}`)
    rawToken.value = data
    tokenEventsCount.value = data.logsCount
  }

  async function fetchTotalSupply() {
    const contract = await Contract.initialize({
      ...aeSdk.value.getContext(),
      aci: TOKEN_SUPPLY_ACI,
      address: tokenId.value,
    })
    const contractCallResult = await contract.total_supply()
    rawTotalSupply.value = contractCallResult?.decodedResult
  }

  async function fetchTokenEvents({ queryParameters, limit, contractId } = {}) {
    rawTokenEvents.value = null
    const defaultParameters = `/contracts/logs?contract=${contractId}&aexn-args=true&limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawTokenEvents.value = data
  }

  async function fetchTokenHolders({ queryParameters, limit } = {}) {
    rawTokenHolders.value = null
    const defaultParameters = `/aex9/${tokenId.value}/balances?by=amount&limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawTokenHolders.value = data
  }

  async function fetchTokenHoldersCount() {
    tokenHoldersCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/aex9/${tokenId.value}`)
    tokenHoldersCount.value = data.holders
  }

  async function fetchTokenTrades({ queryParameters, limit, contractId } = {}) {
    rawTokenTrades.value = null
    const defaultParameters = `/dex/${contractId}/swaps?limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawTokenTrades.value = data
  }

  return {
    fetchTokenDetails,
    fetchTokenHolders,
    tokenHoldersCount,
    fetchTokenEvents,
    fetchTokenHoldersCount,
    fetchTokenTrades,
    tokenDetails,
    tokenHolders,
    tokenEvents,
    tokenEventsCount,
    tokenTrades,
  }
})
