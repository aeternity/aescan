import useAxios from '@/composables/useAxios'
import { formatAettosToAe } from '~/utils/format'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { limit, queryParameters } = getQuery(event)

  const url = getUrl({
    entity: 'stats/miners',
    limit: limit ?? 10,
    queryParameters,
  })

  const { data } = await axios.get(url)

  return adaptMiners(data)
})

function adaptMiners(miners) {
  const formattedData = miners.data.map(miner => {
    return {
      miner: miner.miner,
      totalReward: formatAettosToAe(miner.totalReward),
    }
  })
  return {
    next: miners.next,
    data: formattedData,
    prev: miners.prev,
  }
}
