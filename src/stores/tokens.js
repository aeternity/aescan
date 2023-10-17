import { computed, ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import { defineStore, storeToRefs } from 'pinia'
import useAxios from '@/composables/useAxios'
import { adaptListedTokens, adaptTokens } from '@/utils/adapters'
import { TOKEN_SUPPLY_ACI } from '~/utils/constants'
import { useAesdk } from '~/stores/aesdk'

export const useTokensStore = defineStore('tokens', () => {
  const axios = useAxios()
  const { aeSdk } = storeToRefs(useAesdk())

  const {
    MIDDLEWARE_URL,
    DEX_BACKEND_URL,
  } = useRuntimeConfig().public
  const rawListedTokens = ref(null)
  const rawAllTokens = ref(null)
  const selectedTokenName = ref(null)
  const allTokensCount = ref(null)

  const selectedTokens = computed(() => {
    return selectedTokenName.value?.key === 'listedTokens' ? listedTokens.value : allTokens.value
  })
  const selectedTokensCount = computed(() => {
    return selectedTokenName.value?.key === 'listedTokens' ? listedTokens.value?.data.length : allTokensCount.value
  })

  const listedTokens = computed(() =>
    rawListedTokens.value
      ? adaptListedTokens(rawListedTokens.value)
      : null,
  )
  const allTokens = computed(() =>
    rawAllTokens.value
      ? adaptTokens(rawAllTokens.value)
      : null,
  )

  function fetchTokens(queryParameters) {
    return Promise.allSettled([
      fetchAllTokens(queryParameters),
      fetchListedTokens(),
    ])
  }

  async function fetchAllTokens(queryParameters = null) {
    rawAllTokens.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || '/v2/aex9?by=name&direction=forward'}`)
    rawAllTokens.value = {
      next: data.next,
      data: await appendTotalSupply(data.data),
      prev: data.prev,
    }
  }

  async function fetchTokensCount() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/aex9/count`)
    allTokensCount.value = data.data
  }

  async function fetchListedTokens() {
    rawListedTokens.value = null
    const { data } = await axios.get(`${DEX_BACKEND_URL}/tokens/listed`)
    rawListedTokens.value = await appendTotalSupply(data)
  }

  async function fetchTotalSupply(tokenId) {
    const contractInstance = await aeSdk.value.initializeContract({
      aci: TOKEN_SUPPLY_ACI,
      address: tokenId,
    })
    const contractCallResult = await contractInstance.total_supply()

    return contractCallResult?.decodedResult
  }

  async function appendTotalSupply(tokens) {
    return await Promise.all(
      tokens.map(async token => {
        const totalSupply = await fetchTotalSupply(token.address || token.contractId)
        return {
          ...token,
          totalSupply,
        }
      }))
  }

  return {
    selectedTokens,
    selectedTokenName,
    allTokensCount,
    selectedTokensCount,
    fetchTokens,
    fetchTokensCount,
  }
})
