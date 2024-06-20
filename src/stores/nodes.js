import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'

export const useNodes = defineStore('nodes', () => {
  const axios = useAxios()

  const nodes = ref(null)

  async function fetchNodes() {
    nodes.value = null
    const { data } = await axios.get('http://138.68.22.27:3113/v2/debug/network')
    nodes.value = data
  }

  return {
    nodes,
    fetchNodes,
  }
})
