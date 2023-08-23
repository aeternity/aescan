import { computed, ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'
import { adaptListedTokens } from '@/utils/adapters'

export const useTokensStore = defineStore('tokens', () => {
  const axios = useAxios()
  const rawListedTokens = ref(null)
  const allTokens = ref(null)
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

  function fetchTokens(queryParameters) {
    return Promise.allSettled([
      fetchAllTokens(queryParameters),
      fetchListedTokens(),
    ])
  }

  async function fetchAllTokens(queryParameters = null) {
    allTokens.value = null
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}${queryParameters || '/v2/aex9?by=name&direction=forward'}`)
    allTokens.value = data
  }

  async function fetchListedTokens() {
    rawListedTokens.value = null
    const { data } = await axios.get(`${useRuntimeConfig().public.DEX_BACKEND_URL}/tokens`)
    rawListedTokens.value = data
  }

  async function fetchTokensCount() {
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/aex9/count`)
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
