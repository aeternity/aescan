import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from 'nuxt/app'
import { adaptOracleDetails } from '@/utils/adapters'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export const useOracleDetailsStore = defineStore('oracleDetails', () => {
  const { MIDDLEWARE_URL } = useRuntimeConfig().public
  const { blockHeight } = storeToRefs(useRecentBlocksStore())

  const oracleId = ref(null)
  const rawOracle = ref(null)
  const creationTx = ref(null)
  const lastExtendedTx = ref(null)
  const lastQueryTx = ref(null)

  const oracleDetails = computed(() => rawOracle.value
    ? adaptOracleDetails(
      rawOracle.value,
      creationTx.value,
      lastExtendedTx.value,
      lastQueryTx.value,
      blockHeight.value,
    )
    : null,
  )

  async function fetchOracleDetails(id) {
    oracleId.value = id

    await Promise.allSettled([
      fetchOracle().then(() => fetchCreationTx()),
      fetchLastQueryTx(),
      fetchLastExtendedTx(),
    ])

    return true
  }

  async function fetchOracle() {
    const { data } = await axios.get(`${MIDDLEWARE_URL}/v2/oracles/${oracleId.value}`)
    rawOracle.value = data
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
    creationTx,
    lastExtendedTx,
    lastQueryTx,
  }
})
