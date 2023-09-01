import { defineStore, storeToRefs } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptDashboardStateChannels } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useDashboardStateChannelsStore = defineStore('dashboardStateChannels', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()
  const { blockHeight } = storeToRefs(useRecentBlocksStore())
  const rawStateChannels = ref(null)

  const stateChannels = computed(() =>
    rawStateChannels.value
      ? adaptDashboardStateChannels(rawStateChannels.value, blockHeight.value)
      : null,
  )

  async function fetchStateChannels() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/channels?&limit=4`)
    rawStateChannels.value = data.data
  }

  return {
    rawStateChannels,
    stateChannels,
    fetchStateChannels,
  }
})
