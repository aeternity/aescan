import { DateTime } from 'luxon'
import useAxios from '~/composables/useAxios'
// todo rename component
const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const defaultParameters = `/v3/accounts/${query.accountId}/activities?limit=${query.limit || 10}`

  const url = new URL(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)
  console.log('url', url)
  const { data } = await axios.get(url)
  return adaptAccountActivities(data)
})

function adaptAccountActivities(activities) {
  const formattedData = activities.data.map(activity => {
    return {
      hash: activity.payload?.hash || activity.payload?.txHash ||
        activity.payload?.refTxHash || activity.payload?.callTxHash,
      type: activity.type,
      time: DateTime.fromMillis(activity.payload?.microTime || activity.blockTime)
        .toLocaleString(DateTime.DATETIME_SHORT),
      height: activity.payload?.blockHeight || activity.height,
      payload: activity.payload,
      hintKey:
        activity.payload?.tx
          ? activity.payload.tx.type.charAt(0).toLowerCase() + activity.payload.tx.type.slice(1)
          : null,
    }
  })

  return {
    next: activities.next,
    data: formattedData,
    prev: activities.prev,
  }
}
