export const useOraclesStore = defineStore('oracles', () => {
  const oracles = ref(null)
  const oraclesCount = ref(null)

  const activeOraclesCount = computed(() => {
    return oraclesCount.value?.activeOracles
  })

  const inactiveOraclesCount = computed(() => {
    return oraclesCount.value?.inactiveOracles
  })

  function getOraclesCount(state) {
    if (state === 'active') {
      return activeOraclesCount.value
    } else {
      return inactiveOraclesCount.value
    }
  }

  async function fetchOracles(queryParameters = null) {
    oracles.value = null
    const slug = `?${queryParameters.substring(3).split('?')[1]}`
    const data = await $fetch(`/api/oracles${slug}`)
    oracles.value = data
  }

  async function fetchOraclesCount() {
    oraclesCount.value = null
    oraclesCount.value = await $fetch('/api/oracles/count')
    console.log('oraclesCount.value', oraclesCount.value)
  }

  return {
    oracles,
    fetchOracles,
    fetchOraclesCount,
    getOraclesCount,
  }
})
