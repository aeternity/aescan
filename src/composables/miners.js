import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'

export const useMinersStore = defineStore('miners', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const minersCount = ref(null)
  const blockReward = ref(null)
  const difficulty = ref(null)

  function fetchMiners() {
    return Promise.all([
      fetchMinersCount(),
      fetchBlockReward(),
      fetchDifficulty(),
    ])
  }

  async function fetchMinersCount() {
    minersCount.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats`)
    minersCount.value = data.minersCount
  }

  async function fetchBlockReward() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/delta?limit=1`)
    blockReward.value = data.data[0].blockReward
    console.log('data.data', data.data)
  }

  async function fetchDifficulty() {
    difficulty.value = null
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/difficulty`)
    console.log('data', data)
    difficulty.value = data.data[0].count
  }

  return {
    minersCount,
    blockReward,
    difficulty,
    fetchMiners,
  }
})
