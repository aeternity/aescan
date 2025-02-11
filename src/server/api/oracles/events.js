import useAxios from '@/composables/useAxios'
import { formatAettosToAe, formatDecodeBase64 } from '@/utils/format'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const defaultParameters = `/oracles/${query.id}/responses?limit=${query.limit || 10}`
  const url = new URL(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)
  const { data } = await axios.get(url)
  return adaptOracleEvents(data)
})

export function adaptOracleEvents(events) {
  const formattedData = events.data.map(event => {
    return {
      queriedAt: event.query.blockTime,
      queriedHeight: event.query.height,
      respondedAt: event.blockTime,
      respondedHeight: event.height,
      queryTx: event.query.sourceTxHash,
      respondTx: event.sourceTxHash,
      queryId: event.query.queryId,
      queryFee: formatAettosToAe(event.query.fee),
      query: formatDecodeBase64(event.query.query),
      responseTtl: event.query.responseTtl.value,
      response: formatDecodeBase64(event.response),
    }
  })
  return {
    next: events?.next,
    data: formattedData,
    prev: events?.prev,
  }
}
