import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
// todo move it to api
// todo loading

export const useMinersStore = defineStore('miners', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const minersCount = ref(null)
  const miners = ref(null)
  const blockReward = ref(null)
  const status = ref(null)
  const maxTPS = ref(null)
  const blocksPerMinute = ref(null)
  const topMiners = ref(null)
  const statistics = ref(null)

  async function fetchMining() {
    statistics.value = null
    statistics.value = await $fetch('/api/mining/statistics')
  }

  async function fetchMiners({ queryParameters, limit } = {}) {
    miners.value = null
    const defaultParameters = `/stats/miners?limit=${limit ?? 10}`
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    miners.value = data
  }

  async function fetchTopMiners({ queryParameters, limit } = {}) {
    topMiners.value = null
    const defaultParameters = '/stats/miners/top?interval_by=day&min_start_date=2025-02-11&max_start_date=2025-02-11&limit=10&direction=forward'
    const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
    topMiners.value = data.data
  }

  return {
    statistics,
    miners,
    minersCount,
    status,
    blockReward,
    blocksPerMinute,
    maxTPS,
    fetchMining,
    fetchMiners,
    fetchTopMiners,
    topMiners,
  }
})
