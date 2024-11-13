import { DateTime } from 'luxon'
import useAxios from '@/composables/useAxios'
import { formatAettosToAe } from '~/utils/format'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async() => {
  const url = new URL(`${MIDDLEWARE_URL}/v3/channels?&limit=4`)
  const { data } = await axios.get(url)
  const formatted = adaptDashboardStateChannels(data.data)
  return formatted
})

function adaptDashboardStateChannels(stateChannels) {
  return stateChannels.map(channel => {
    return {
      initiator: channel.initiator,
      responder: channel.responder,
      channel: channel.channel,
      updateCount: channel.updatesCount,
      amount: formatAettosToAe(channel.amount),
      updatedHeight: channel.lastUpdatedHeight,
      updated: DateTime.fromMillis(channel.lastUpdatedTime).toLocaleString(DateTime.DATETIME_SHORT),
      lastTxType: channel.lastUpdatedTxType,
    }
  })
}
