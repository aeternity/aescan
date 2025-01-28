import { DateTime } from 'luxon'
import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const defaultParameters = `/key-blocks/${query.keyblockHash}/micro-blocks?limit=${query.limit ?? 10}`

  const url = new URL(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)
  const { data } = await axios.get(url)
  return adaptKeyblockMicroblocks(data)
})

export function adaptKeyblockMicroblocks(microblocks) {
  const formattedData = microblocks.data.map(microblock => {
    return {
      time: microblock.time,
      transactionsCount: microblock.transactionsCount,
      hash: microblock.hash,
    }
  })
  return {
    next: microblocks.next,
    data: formattedData,
    prev: microblocks.prev,
  }
}
