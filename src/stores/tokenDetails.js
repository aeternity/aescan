import { defineStore, storeToRefs } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptTokenDetails, adaptTokenEvents, adaptTokenHolders } from '@/utils/adapters'
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
  const tokenEvents = ref(null)
  const tokenEventsCount = ref(null)

  const rawToken = ref(null)
  const rawTotalSupply = ref(null)
  const rawTokenHolders = ref(null)
  const tokenHoldersCount = ref(null)

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
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/aex9/${tokenId.value}`)
    rawToken.value = data
    tokenEventsCount.value = data.logsCount
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
    tokenEvents.value = null
    const data = await $fetch(`/api/tokens/events`, { params: { contractId, limit, queryParameters } })

    tokenEvents.value = data
  }

  async function fetchTokenHolders({ queryParameters, limit } = {}) {
    rawTokenHolders.value = null
    const defaultParameters = `/v2/aex9/${tokenId.value}/balances?by=amount&limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawTokenHolders.value = data
  }

  async function fetchTokenHoldersCount() {
    tokenHoldersCount.value = null
    const data = await $fetch(`/api/tokens/holders/count`, {
      params: {
        id: tokenId.value,
      },
    })
    tokenHoldersCount.value = data
  }

  return {
    fetchTokenDetails,
    fetchTokenHolders,
    tokenHoldersCount,
    fetchTokenEvents,
    fetchTokenHoldersCount,
    tokenDetails,
    tokenHolders,
    tokenEvents,
    tokenEventsCount,
  }
})
