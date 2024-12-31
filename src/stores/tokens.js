import { computed, ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'
import { adaptListedTokens } from '@/utils/adapters'
import useFeatureFlags from '@/composables/useFeatureFlags'

export const useTokensStore = defineStore('tokens', () => {
  const { MIDDLEWARE_URL, DEX_BACKEND_URL, NETWORK_NAME } = useRuntimeConfig().public
  const featureFlags = useFeatureFlags()
  const axios = useAxios()
  const rawListedTokens = ref(null)
  const allTokens = ref(null)
  const selectedTokenName = ref(null)
  const allTokensCount = ref(null)

  const selectedTokens = computed(() => {
    if (!featureFlags.dex) {
      return allTokens.value
    }

    return selectedTokenName.value?.key === 'listedTokens' && NETWORK_NAME !== 'TESTNET' ? listedTokens.value : allTokens.value
  })
  const selectedTokensCount = computed(() => {
    if (!featureFlags.dex) {
      return allTokensCount.value
    }

    return selectedTokenName.value?.key === 'listedTokens' ? listedTokens.value?.data.length : allTokensCount.value
  })

  const listedTokens = computed(() =>
    rawListedTokens.value
      ? adaptListedTokens(rawListedTokens.value)
      : null,
  )

  function fetchTokens(queryParameters) {
    return Promise.allSettled([
      fetchAllTokens(queryParameters),
      fetchListedTokens(),
    ])
  }

  async function fetchAllTokens(queryParameters = null) {
    allTokens.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || '/v3/aex9?by=name&direction=forward'}`)
    allTokens.value = data
  }

  async function fetchListedTokens() {
    if (!featureFlags.dex) {
      return
    }

    rawListedTokens.value = null
    const { data } = await axios.get(`${DEX_BACKEND_URL}/tokens/listed`)
    rawListedTokens.value = data
  }

  async function fetchTokensCount() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/aex9/count`)
    allTokensCount.value = data.data
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
