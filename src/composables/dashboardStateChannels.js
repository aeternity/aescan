import { useRuntimeConfig } from 'nuxt/app'

export const useDashboardStateChannelsStore = defineStore('dashboardStateChannels', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const rawStateChannels = ref(null)

  const stateChannels = computed(() =>
    rawStateChannels.value
      ? adaptDashboardStateChannels(rawStateChannels.value)
      : null,
  )

  async function fetchStateChannels() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/channels?&limit=4`)
    rawStateChannels.value = data.data
  }

  return {
    rawStateChannels,
    stateChannels,
    fetchStateChannels,
  }
})
