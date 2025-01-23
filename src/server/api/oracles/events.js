import { DateTime } from 'luxon'
import useAxios from '~/composables/useAxios'
import { formatAettosToAe, formatDecodeBase64 } from '~/utils/format'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const url = new URL(`${MIDDLEWARE_URL}/v3/oracles/${query.id}/responses`)
  // todo do I need to try? try on 0 events

  const { data } = await axios.get(url)
  return adaptOracleEvents(data)
})

export function adaptOracleEvents(events) {
  const formattedData = events.data.map(event => {
    return {
      queriedAt: DateTime.fromMillis(event.query.blockTime).toLocaleString(DateTime.DATETIME_SHORT),
      queriedHeight: event.query.height,
      respondedAt: DateTime.fromMillis(event.blockTime).toLocaleString(DateTime.DATETIME_SHORT),
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
