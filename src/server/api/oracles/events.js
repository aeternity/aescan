import useAxios from '@/composables/useAxios'
import { formatAettosToAe, formatDecodeBase64 } from '@/utils/format'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { id, limit, queryParameters } = getQuery(event)

  const url = getUrl({
    entity: 'oracles',
    route: 'responses',
    id,
    parameters: { limit: limit ?? 10 },
    queryParameters,
  })

  const { data } = await axios.get(url)
  return adaptOracleEvents(data)
})

function adaptOracleEvents(events) {
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
