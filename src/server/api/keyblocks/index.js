import { DateTime } from 'luxon'
import useAxios from '@/composables/useAxios'
import { formatAettosToAe } from '~/utils/format'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  // todo is V3 needed?
  // todo rename to statistics
  const query = getQuery(event)
  const defaultParameters = `/key-blocks?limit=${query.limit ?? 10}`
  const url = new URL(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)
  const { data } = await axios.get(url)
  return adaptKeyblocks(data)
})

export function adaptKeyblocks(keyblocks) {
  const formattedData = keyblocks.data
    .map(keyblock => {
      return {
        hash: keyblock.hash,
        block: keyblock.height,
        time: DateTime.fromMillis(keyblock.time).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
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
