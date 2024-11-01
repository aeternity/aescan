import useAxios from '~/composables/useAxios'
import { DateTime } from "luxon";
import { formatAettosToAe } from "~/utils/format";

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
// todo better naming
  const id = getRouterParam(event, 'id')
  // todo getRouterParam funguje jen s [id] ?

  const [rawOracle, lastExtendedTx, lastOracleEvent] = await Promise.all([
    fetchOracle(id),
    fetchLastExtendedTx(id),
    fetchOracleEvents(id),
  ])

  return adaptOracleDetails(rawOracle, lastExtendedTx, lastOracleEvent)
})

async function fetchOracle(id) {
  const url = new URL(`${MIDDLEWARE_URL}/v3/oracles/${id}`)
  const { data } = await axios.get(url)
  return data
}

async function fetchLastExtendedTx(id) {
  const url = new URL(`${MIDDLEWARE_URL}/v3/transactions?direction=backward&limit=1&type=oracle_extend&oracle=${id}`)
  const { data } = await axios.get(url)
  return data.data?.[0]
}

async function fetchOracleEvents(id) {
// todo do i need try
//   todo this is dupliucate
  try {
    const url = new URL(`${MIDDLEWARE_URL}/v3/oracles/${id}/responses`)
    const { data } = await axios.get(url)
    return data.data?.[0]?.query
  } catch (e) {
    return null
  }
}

export function adaptOracleDetails(oracle, lastExtendedTx, lastQueryTx) {
  const oracleDetails = {
    id: oracle.oracle,
    fee: formatAettosToAe(oracle.queryFee),
    expiration: DateTime.fromMillis(oracle.approximateExpireTime).toLocaleString(DateTime.DATETIME_SHORT),
    expirationHeight: oracle.expireHeight,
    registered: DateTime.fromMillis(oracle.registerTime).toLocaleString(DateTime.DATETIME_SHORT),
    registeredHeight: oracle.activeFrom,
    queryFormat: oracle.format.query,
    responseFormat: oracle.format.response,
    operator: oracle.oracle.replace('ok_', 'ak_'),
    lastExtended: lastExtendedTx ? DateTime.fromMillis(lastExtendedTx.microTime).toLocaleString(DateTime.DATETIME_SHORT) : null,
    lastExtendedHeight: lastExtendedTx?.blockHeight,
    lastQueried: lastQueryTx ? DateTime.fromMillis(lastQueryTx.blockTime).toLocaleString(DateTime.DATETIME_SHORT) : null,
    lastQueryHeight: lastQueryTx?.height,
  }
  return oracleDetails
}

