import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptTrades } from '@/utils/adapters'
import { useMarketStatsStore } from '@/stores/marketStats'

export const useDexTradesStore = defineStore('dexTrades', () => {
  const axios = useAxios()
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const { price } = storeToRefs(useMarketStatsStore())

  const trades = ref(null)
  //
  // const trades = computed(() => rawTrades.value && price.value
  //   ? adaptTrades(rawTrades.value, price.value)
  //   : null,
  // )

  async function fetchDexTrades({ queryParameters, limit } = {}) {
    trades.value = null
    const data = await $fetch(`/api/dex/trades`, { params: { queryParameters, limit } })
    trades.value = data
  }

  return {
    fetchDexTrades,
    trades,
  }
},
)
