import { defineStore, storeToRefs } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptTokenDetails, adaptTokenEvents } from '@/utils/adapters'
import { TOKEN_SUPPLY_ACI } from '@/utils/constants'
import { useAesdk } from '@/stores/aesdk'
import { useDexStore } from '@/stores/dex'

export const useTokenDetailsStore = defineStore('tokenDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const { aeSdk } = storeToRefs(useAesdk())
  const { fetchPrice } = useDexStore()

  const tokenId = ref(null)
  const price = ref(null)
  const rawTokenEvents = ref(null)
  const tokenEventsCount = ref(null)

  const rawToken = ref(null)
  const rawTotalSupply = ref(null)
  const rawTokenHolders = ref(null)

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

  const tokenEvents = computed(() => {
    return rawTokenEvents.value
      ? adaptTokenEvents(rawTokenEvents.value)
      : null
  })

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
    price.value = await fetchPrice(tokenId.value, rawToken.value.decimals)
  }

  async function fetchToken() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/aex9/${tokenId.value}`)
    rawToken.value = data
  }

  async function fetchTotalSupply() {
    const contractInstance = await aeSdk.value.initializeContract({
      aci: TOKEN_SUPPLY_ACI,
      address: tokenId.value,
    })
    const contractCallResult = await contractInstance.total_supply()
    rawTotalSupply.value = contractCallResult?.decodedResult
  }

  async function fetchTokenEvents({ queryParameters, limit, contractId } = {}) {
    rawTokenEvents.value = null
    const defaultParameters = `/v2/contracts/logs?contract=${contractId}&aexn-args=true&limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawTokenEvents.value = data
  }

  async function fetchTokenEventsCount(contractId) {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/aex9/${contractId}/logs-count`)
    tokenEventsCount.value = data.data
  }

  async function fetchTokenHolders({ queryParameters, limit } = {}) {
    rawTokenHolders.value = null
    const defaultParameters = `/v2/aex9/${tokenId.value}/balances?by=amount&limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawTokenHolders.value = data
    console.log('rawTokenHolders.value', rawTokenHolders.value)
  }

  return {
    fetchTokenDetails,
    fetchTokenHolders,
    fetchTokenEvents,
    fetchTokenEventsCount,
    tokenDetails,
    tokenHolders,
    tokenEvents,
    tokenEventsCount,
  }
},
)
