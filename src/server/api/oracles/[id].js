import useAxios from '@/composables/useAxios'
import { formatAettosToAe } from '@/utils/format'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')

  const [rawOracle, lastExtendedTx, lastOracleEvent] = await Promise.all([
    fetchOracle(id),
    fetchLastExtendedTx(id),
    fetchLastQueriedTx(id),
  ])

  return adaptOracleDetails(rawOracle, lastExtendedTx, lastOracleEvent)
})

async function fetchOracle(id) {
  const url = getUrl({
    entity: 'oracles',
    id,
  })

  const { data } = await axios.get(url)
  return data
}

async function fetchLastExtendedTx(id) {
  const url = getUrl({
    entity: 'transactions',
    parameters: { oracle: id, type: 'oracle_extend', limit: 1, direction: 'backward' },
  })

  const { data } = await axios.get(url)
  return data.data?.[0]
}

async function fetchLastQueriedTx(id) {
  // todo destruct
  const url = getUrl({
    entity: 'oracles',
    id,
    route: 'responses',
    parameters: { limit: 1 },
  })

  const { data } = await axios.get(url)

  return data.data?.[0]?.query
}

function adaptOracleDetails(oracle, lastExtendedTx, lastQueryTx) {
  return {
    id: oracle.oracle,
    fee: formatAettosToAe(oracle.queryFee),
    expiration: oracle.approximateExpireTime,
    expirationHeight: oracle.expireHeight,
    registered: oracle.registerTime,
    registeredHeight: oracle.activeFrom,
    queryFormat: oracle.format.query,
    responseFormat: oracle.format.response,
    operator: oracle.oracle.replace('ok_', 'ak_'),
    lastExtended: lastExtendedTx ? lastExtendedTx.microTime : null,
    lastExtendedHeight: lastExtendedTx?.blockHeight,
    lastQueried: lastQueryTx ? lastQueryTx.blockTime : null,
    lastQueryHeight: lastQueryTx?.height,
  }
}
