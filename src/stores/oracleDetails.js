import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import useAxios from '@/composables/useAxios'
import { adaptOracleDetails, adaptOracleEvents } from '@/utils/adapters'

export const useOracleDetailsStore = defineStore('oracleDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const axios = useAxios()

  const oracleId = ref(null)
  const rawOracle = ref(null)
  const lastExtendedTx = ref(null)
  const rawEvents = ref(null)

  const oracleDetails = computed(() => rawOracle.value
    ? adaptOracleDetails(
      rawOracle.value,
      lastExtendedTx.value,
      lastQueryTx.value,
    )
    : null,
  )
  const lastQueryTx = computed(() => rawEvents.value?.data?.[0]?.query)
  const oracleEvents = computed(() => rawEvents.value ? adaptOracleEvents(rawEvents.value) : null)

  async function fetchOracleDetails(id) {
    oracleId.value = id

    await Promise.all([
      fetchOracle(),
      Promise.allSettled([
        fetchOracleEvents(),
        fetchLastExtendedTx(),
      ]),
    ])

    return true
  }

  async function fetchOracle() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/oracles/${oracleId.value}?tx_hash=true`)
    rawOracle.value = data
  }

  async function fetchLastExtendedTx() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/transactions?direction=backward&limit=1&type=oracle_extend&oracle=${oracleId.value}`)
    lastExtendedTx.value = data.data?.[0]
  }

  async function fetchOracleEvents(queryParameters = null) {
    rawEvents.value = null
    const defaultParameters = `/v3/oracles/${oracleId.value}/responses`

    try {
      const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || defaultParameters}`)
      rawEvents.value = data
    } catch (e) {
      rawEvents.value = null
    }
  }

  return {
    fetchOracleDetails,
    fetchOracleEvents,
    oracleDetails,
    oracleId,
    rawOracle,
    lastExtendedTx,
    oracleEvents,
  }
})
