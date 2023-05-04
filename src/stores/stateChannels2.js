import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { defineStore } from 'pinia'
import { adaptStateChannels2 } from '~/utils/adapters'

export const useStateChannelsStore = defineStore('stateChannels', () => {
  const rawStateChannels = ref(null)

  const stateChannels = computed(() => {
    return rawStateChannels.value
      ? adaptStateChannels2(rawStateChannels.value)
      : null
  })

  async function fetchStateChannels() {
    console.log('fetchStateChannels')
    // todo better import
    const { data } = await axios.get(`${useRuntimeConfig().public.MIDDLEWARE_URL}/v2/channels?&limit=10`)
    this.rawStateChannels = data.data
    console.log('data', data)
    rawStateChannels.value = data
  }

  return {
    fetchStateChannels,
    stateChannels,
  }
})
