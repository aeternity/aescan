import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const url = getUrl({
    baseUrl: 'key-blocks',
    id: query.keyblockHash,
    route: 'micro-blocks',
    parameters: { limit: query.limit ?? 10 },
    queryParameters: query.queryParameters,
  })
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
