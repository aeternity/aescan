import { computed, ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import { defineStore } from 'pinia'
import { adaptListedTokens } from '@/utils/adapters'

export const useTokensStore = defineStore('tokens', () => {
  const {  NETWORK_NAME } = useRuntimeConfig().public
  const rawListedTokens = ref(null)
  const allTokens = ref(null)
  const selectedTokenName = ref(null)
  const allTokensCount = ref(null)

  const selectedTokens = computed(() => {
    return selectedTokenName.value?.key === 'listedTokens' && NETWORK_NAME !== 'TESTNET' ? listedTokens.value : allTokens.value
  })
  const selectedTokensCount = computed(() => {
    return selectedTokenName.value?.key === 'listedTokens' ? listedTokens.value?.data.length : allTokensCount.value
  })

  const listedTokens = computed(() =>
    rawListedTokens.value
      ? adaptListedTokens(rawListedTokens.value)
      : null,
  )

 async  function fetchTokens(queryParameters) {
   allTokens.value = null
   rawListedTokens.value = null
   // test mainnet testnet
// todo pass query params

   // todo rename
    const aaa = await $fetch('/api/tokens')
    allTokens.value = aaa[0].value
    rawListedTokens.value = aaa[1].value
  }


  async function fetchTokensCount() {
    allTokensCount.value = await $fetch('/api/tokens/count')
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
