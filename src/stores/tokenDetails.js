import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptTokenDetails } from '@/utils/adapters'
import { formatTokenPairRouteAsRatio } from '@/utils/format'
import { TOKEN_SUPPLY_ACI } from '@/utils/constants'
import { useAesdk } from '@/stores/aesdk'

export const useTokenDetailsStore = defineStore('tokenDetails', () => {
  const { AE_TOKEN_ID, DEX_BACKEND_URL } = useRuntimeConfig().public
  const { aeSdk } = storeToRefs(useAesdk())

  const rawToken = ref(null)
  const tokenId = ref(null)
  const rawTotalSupply = ref(null)
  const price = ref(null)

  const tokenDetails = computed(() => rawToken.value
    ? adaptTokenDetails(
      rawToken.value,
      rawTotalSupply.value,
      price.value,
    )
    : null,
  )

  function fetchTokenDetails(id) {
    tokenId.value = id

    return Promise.allSettled([
      fetchToken(),
      fetchTotalSupply(),
      fetchPrice(),
    ])
  }

  async function fetchToken() {
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/aex9/${tokenId.value}`)
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

  async function fetchPrice() {
    if (tokenId.value === AE_TOKEN_ID) {
      price.value = 1
      return
    }

    const { data } = await axios.get(`${DEX_BACKEND_URL}/pairs/swap-routes/${tokenId.value}/${AE_TOKEN_ID}`)

    if (data.length === 0) {
      price.value = false
      return
    }

    price.value = formatTokenPairRouteAsRatio(data[0])
  }

  return {
    fetchTokenDetails,
    tokenDetails,
  }
})
