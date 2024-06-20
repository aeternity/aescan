import { defineStore } from 'pinia'
import useAxios from '@/composables/useAxios'

export const useNodeOperators = defineStore('nodeOperators', () => {
  const axios = useAxios()

  const nodeOperators = ref(null)

  async function fetchNodeOperators() {
    nodeOperators.value = null
    const { data } = await axios.get('http://138.68.22.27:3113/v2/debug/network')
    nodeOperators.value = data
  }

  return {
    nodeOperators,
    fetchNodeOperators,
  }
})
