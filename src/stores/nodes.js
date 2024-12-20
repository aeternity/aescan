import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'

export const useNodes = defineStore('nodes', () => {
  const axios = useAxios()
  const { NODES_BACKEND_URL } = useRuntimeConfig().public

  const nodes = ref(null)

  async function fetchNodes() {
    nodes.value = null
    const { data } = await axios.get(NODES_BACKEND_URL)
    nodes.value = data
  }

  return {
    nodes,
    fetchNodes,
  }
})
