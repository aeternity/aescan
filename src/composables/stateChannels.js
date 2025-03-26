export const useStateChannelsStore = defineStore('stateChannels', () => {
  const stateChannels = ref(null)
  const stateChannelsCount = ref(null)

  async function fetchStateChannels(queryParameters) {
    stateChannels.value = null
    stateChannels.value = await $fetch('/api/channels', {
      params: { queryParameters },
    })
  }

  async function fetchStateChannelsCount() {
    stateChannelsCount.value = null
    stateChannelsCount.value = await $fetch('/api/channels/count')
  }

  return {
    fetchStateChannelsCount,
    stateChannelsCount,
    fetchStateChannels,
    stateChannels,
  }
})
