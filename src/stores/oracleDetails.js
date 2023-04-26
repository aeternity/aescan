import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptOracleDetails, adaptOracleEvents } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useOracleDetailsStore = defineStore('oracleDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const { blockHeight } = storeToRefs(useRecentBlocksStore())

  const oracleId = ref(null)
  const rawOracle = ref(null)
  const totalQueries = ref(null)
  const creationTx = ref(null)
  const lastExtendedTx = ref(null)
  const lastQueryTx = ref(null)

  const oracleDetails = computed(() => rawOracle.value
    ? adaptOracleDetails(
      rawOracle.value,
      totalQueries.value,
      creationTx.value,
      lastExtendedTx.value,
      lastQueryTx.value,
      blockHeight.value,
    )
    : null,
  )

  const oracleEvents = computed(() => rawOracle.value ? adaptOracleEvents(rawOracle.value) : null)

  async function fetchOracleDetails(id) {
    oracleId.value = id

    await Promise.allSettled([
      fetchOracle().then(() => fetchCreationTx()),
      fetchLastQueryTx(),
      fetchLastExtendedTx(),
      fetchTotalQueries(),
    ])

    return true
  }

  async function fetchOracle() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/oracles/${oracleId.value}`)
    rawOracle.value = data
  }

  async function fetchTotalQueries() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/txs/count/${oracleId.value}`)
    totalQueries.value = data?.oracle_query_tx?.oracle_id ?? 0
  }

  async function fetchCreationTx() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/txs/${rawOracle.value.register_tx_hash}`)
    creationTx.value = data
  }

  async function fetchLastQueryTx() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/txs?direction=backward&limit=1&type=oracle_query&oracle=${oracleId.value}`)
    lastQueryTx.value = data.data?.[0]
  }

  async function fetchLastExtendedTx() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/txs?direction=backward&limit=1&type=oracle_extend&oracle=${oracleId.value}`)
    lastExtendedTx.value = data.data?.[0]
  }

  return {
    fetchOracleDetails,
    oracleDetails,
    oracleId,
    rawOracle,
    totalQueries,
    creationTx,
    lastExtendedTx,
    lastQueryTx,
    oracleEvents,
  }
})
