import { defineStore } from 'pinia'
import axios from 'axios'
import { MARKET_STATS_ADDRESS, MAX_AE_DISTRIBUTION } from '@/utils/constants'
import { useBlockchainStatsStore } from '@/stores/blockchainStats'

export const useMarketStatsStore = defineStore('marketStats', {
  state: () => ({
    price: null,
    priceChange: null,
    marketCap: null,
    circulatingSupply: null,
  }),
  getters: {
    distribution(state) {
      const { burnedCount } = useBlockchainStatsStore()

      return state.circulatingSupply && burnedCount ? state.circulatingSupply + Number(burnedCount) : null
    },
    distributionPercentage() {
      return this.distribution ? (this.distribution / MAX_AE_DISTRIBUTION * 100).toFixed(2) : null
    },
  },
  actions: {
    fetchMarketStats() {
      this.fetchPrice()
      this.fetchCoinStats()
    },
    async fetchPrice() {
      const { data } = await axios.get(`${MARKET_STATS_ADDRESS}/simple/price?ids=aeternity&vs_currencies=usd&include_24hr_change=true`)
      this.price = data.aeternity.usd
      this.priceChange = data.aeternity.usd_24h_change.toFixed(2)
    },
    async fetchCoinStats() {
      const { data } = await axios.get(`${MARKET_STATS_ADDRESS}/coins/aeternity`)
      this.marketCap = data.market_data.market_cap.usd
      this.circulatingSupply = data.market_data.circulating_supply
    },
  },
})
