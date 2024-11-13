import { defineStore } from 'pinia'

export const useDashboardStateChannelsStore = defineStore('dashboardStateChannels', () => {
  const stateChannels = ref(null)

  async function fetchStateChannels() {
    stateChannels.value = null
    const data = await $fetch('/api/dashboardstatechannels')
    stateChannels.value = data
  }

  return {
    stateChannels,
    fetchStateChannels,
  }
})
