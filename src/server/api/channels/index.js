import useAxios from '@/composables/useAxios'
import { formatAettosToAe } from '@/utils/format'

const axios = useAxios()

export default defineEventHandler(async (event) => {
  const { queryParameters } = getQuery(event)

  const url = getUrl({
    entity: 'channels',
    queryParameters,
  })

  const { data } = await axios.get(url)
  return adaptStateChannels(data)
})

function adaptStateChannels(stateChannels) {
  const formattedData = stateChannels.data
    .map((channel) => {
      return {
        id: channel.channel,
        status: channel.active ? 'Open' : 'Closed',
        initiator: channel.initiator,
        responder: channel.responder,
        updateCount: channel.updatesCount,
        locked: formatAettosToAe(channel.amount),
        updatedHeight: channel.lastUpdatedHeight,
        updated: channel.lastUpdatedTime,
        lastTxType: channel.lastUpdatedTxType,
      }
    })
  return {
    next: stateChannels.next,
    data: formattedData,
    prev: stateChannels.prev,
  }
}
