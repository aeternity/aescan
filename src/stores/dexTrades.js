import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptTrades } from '@/utils/adapters'
import { useMarketStatsStore } from '@/stores/marketStats'
import { useRuntimeConfig } from "nuxt/app";
import { adaptTrades } from "@/utils/adapters";
import { useMarketStatsStore } from "@/stores/marketStats";

export const useDexTradesStore = defineStore('dexTrades', () => {
  const axios = useAxios()
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const { price } = storeToRefs(useMarketStatsStore())

  const rawTrades = ref(null)

  const trades = computed(() => rawTrades.value && price.value
    ? adaptTrades(rawTrades.value, price.value)
    : null,
  )


  async function fetchDexTrades({ queryParameters, limit } = {}) {
    rawTrades.value = null
    const defaultParameters = `/v3/dex/swaps?limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    rawTrades.value = data
  }


  return {
    fetchDexTrades,
    trades,
  }
},
)
