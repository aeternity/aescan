import { computed, ref } from 'vue'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { defineStore, storeToRefs } from 'pinia'
import { adaptAllTokens, adaptListedTokens } from '@/utils/adapters'
import { TOKEN_SUPPLY_ACI } from '~/utils/constants'
import { useAesdk } from '@/stores/aesdk'

export const useTokensStore = defineStore('tokens', () => {
  const { aeSdk } = storeToRefs(useAesdk())

  const rawListedTokens = ref(null)
  const rawAllTokens = ref(null)
  const selectedTokenName = ref(null)

  const selectedTokens = computed(() => {
    return selectedTokenName.value?.key === 'listedTokens' ? listedTokens.value : allTokens.value
  })

  const listedTokens = computed(() =>
    rawListedTokens.value
      ? adaptListedTokens(rawListedTokens.value)
      : null,
  )
  const allTokens = computed(() => {
    return rawAllTokens.value
      ? adaptAllTokens(rawAllTokens.value)
      : null
  })

  function fetchTokens(queryParameters) {
    return Promise.allSettled([
      fetchAllTokens(queryParameters),
      fetchListedTokens(),
    ])
  }

  async function fetchAllTokens(queryParameters = null) {
    rawAllTokens.value = null
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || '/v2/aex9?by=name&direction=forward'}`)
    rawAllTokens.value = data
  }

  async function fetchListedTokens() {
    rawListedTokens.value = null
    const { data } = await axios.get(`${useRuntimeConfig().public.DEX_BACKEND_URL}/tokens/listed`)
    // for the listed tokens from DEX there need to be amount attached per entry
    rawListedTokens.value = await appendTokenSupply(data)
  }

  async function appendTokenSupply(data) {
    return await Promise.all(data.map(async token => {
      const supply = await fetchTotalSupply(token.address)
      return { ...token, amount: supply }
    }))
  }

  async function fetchTotalSupply(tokenId) {
    const contractInstance = await aeSdk.value.initializeContract({
      aci: TOKEN_SUPPLY_ACI,
      address: tokenId,
    })
    const contractCallResult = await contractInstance.total_supply()
    return contractCallResult?.decodedResult
  }

  return {
    selectedTokens,
    selectedTokenName,
    fetchTokens,
  }
})
