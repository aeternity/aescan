import useAxios from '~/composables/useAxios'
import { DateTime } from "luxon";

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const defaultParameters = `/v3/contracts/logs?contract=${query.contractId}&aexn-args=true&limit=${query.limit ?? 10}`
  const url = new URL(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)
  const { data } = await axios.get(url)
  return adaptTokenEvents(data)
})

export function adaptTokenEvents(events) {
  const formattedData = events.data
    .map(event => {
      return {
        hash: event.callTxHash,
        name: event.eventName || 'N/A',
        created: DateTime.fromMillis(event.blockTime).toLocaleString(DateTime.DATETIME_SHORT),
        createdHeight: event.height,
        isDecoded: !!event.eventName,
        args: event.args,
      }
    })

  return {
    next: events.next,
    data: formattedData,
    prev: events.prev,
  }
}
