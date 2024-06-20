import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'
import { NODES_ADDRESS } from '@/utils/constants'

export const useNodes = defineStore('nodes', () => {
  const axios = useAxios()

  const nodes = ref(null)

  async function fetchNodes() {
    nodes.value = null
    const { data } = await axios.get(NODES_ADDRESS)
    nodes.value = data
  }

  return {
    nodes,
    fetchNodes,
  }
})
