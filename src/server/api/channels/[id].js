import useAxios from '@/composables/useAxios'
import { formatAettosToAe } from '@/utils/format'

const axios = useAxios()

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')

  try {
    const [details, createTx] = await Promise.all([
      fetchStateChannel(id),
      fetchStateChannelCreateTx(id),
    ])
    return adaptStateChannelDetails(details, createTx)
  } catch (error) {
    if ([400, 404].includes(error.response.status)) {
      return { error: error.response.status }
    }
  }
})

async function fetchStateChannel(id) {
  const url = getUrl({
    entity: 'channels',
    id,
  })
  const { data } = await axios.get(url)
  return data
}

async function fetchStateChannelCreateTx(id) {
  const url = getUrl({
    entity: 'channels',
    id,
    route: 'updates',
    limit: 1,
    parameters: { direction: 'forward' },
  })
  const { data } = await axios.get(url)
  return data.data?.[0]
}

function adaptStateChannelDetails(stateChannel, stateChannelCreateTx) {
  return {
    id: stateChannel.channel,
    isOpen: stateChannel.active,
    createTransactionHash: stateChannelCreateTx.sourceTxHash,
    initialAmount: formatAettosToAe(stateChannel.initiatorAmount + stateChannel.responderAmount),
    initiator: stateChannel.initiator,
    responder: stateChannel.responder,
    onChainUpdates: stateChannel.updatesCount,
    lastKnownRound: stateChannel.round,
    aeLocked: formatAettosToAe(stateChannel.amount),
    lastUpdatedHeight: stateChannel.lastUpdatedHeight,
    lastUpdated: stateChannel.lastUpdatedTime,
    lastTxType: stateChannel.lastUpdatedTxType,
  }
}
