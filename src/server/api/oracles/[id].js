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
  const url = new URL(`${MIDDLEWARE_URL}/oracles/${id}`)
  const { data } = await axios.get(url)
  return data
}

async function fetchLastExtendedTx(id) {
  const url = new URL(`${MIDDLEWARE_URL}/transactions?direction=backward&limit=1&type=oracle_extend&oracle=${id}`)
  const { data } = await axios.get(url)
  return data.data?.[0]
}

async function fetchLastQueriedTx(id) {
  const url = new URL(`${MIDDLEWARE_URL}/oracles/${id}/responses?limit=1`)
  const { data } = await axios.get(url)

  return data.data?.[0]?.query
}

export function adaptOracleDetails(oracle, lastExtendedTx, lastQueryTx) {
  const oracleDetails = {
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
  return oracleDetails
}
