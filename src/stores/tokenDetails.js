import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { Node, AeSdk } from '@aeternity/aepp-sdk'
import { adaptTokenDetails } from '@/utils/adapters'
import { formatTokenPairRouteAsRatio } from '@/utils/format'
import { TOKEN_SUPPLY_ACI } from '@/utils/constants'

export const useTokenDetailsStore = defineStore('tokenDetails', () => {
  const { AE_TOKEN_ID, DEX_BACKEND_URL } = useRuntimeConfig().public

  const tokenId = ref(null)
  const tokenInformation = ref(null)
  const rawTotalSupply = ref(null)
  const price = ref(null)

  const fetchTokenDetails = id => {
    tokenId.value = id
    return Promise.allSettled([
      fetchInformation(),
      fetchTotalSupply(),
      fetchPrice(),
    ])
  }

  const fetchInformation = async() => {
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/aex9/${tokenId.value}`)
    tokenInformation.value = data
  }

  const fetchTotalSupply = async() => {
    const node = new Node(useRuntimeConfig().public.NODE_URL)
    const aeSdk = new AeSdk({
      nodes: [
        { name: 'mainnet', instance: node },
      ],
      compilerUrl: 'https://compiler.aepps.com',
    })

    const contractInstance = await aeSdk.initializeContract({
      aci: TOKEN_SUPPLY_ACI,
      address: tokenId.value,
    })
    const contractCallResult = await contractInstance.total_supply()
    rawTotalSupply.value = contractCallResult?.decodedResult
  }

  const fetchPrice = async() => {
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

  const tokenDetails = computed(() => tokenInformation.value
    ? adaptTokenDetails(
      tokenInformation.value,
      rawTotalSupply.value,
      price.value,
    )
    : null,
  )

  return {
    fetchTokenDetails,
    tokenDetails,
  }
})
