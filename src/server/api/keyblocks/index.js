import useAxios from '@/composables/useAxios'
import { formatAettosToAe } from '~/utils/format'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { limit, queryParameters } = getQuery(event)

  const url = getUrl({
    entity: 'key-blocks',
    limit: limit ?? 10,
    queryParameters,
  })

  const { data } = await axios.get(url)
  return adaptKeyblocks(data)
})

function adaptKeyblocks(keyblocks) {
  const formattedData = keyblocks.data
    .map(keyblock => {
      return {
        hash: keyblock.hash,
        block: keyblock.height,
        time: keyblock.time,
        miner: keyblock.miner,
        microBlocksCount: keyblock.microBlocksCount,
        transactionsCount: keyblock.transactionsCount,
        beneficiary: keyblock.beneficiary,
        beneficiaryReward: formatAettosToAe(keyblock.beneficiaryReward),
      }
    })
  return {
    next: keyblocks.next,
    data: formattedData,
    prev: keyblocks.prev,
  }
}
