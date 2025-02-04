export const useNodes = defineStore('nodes', () => {
  const axios = useAxios()

  const nodes = ref(null)

  async function fetchNodes() {
    nodes.value = null
    const { data } = await axios.get('/proxy/nodes')
    nodes.value = data
  }

  return {
    nodes,
    fetchNodes,
  }
})
