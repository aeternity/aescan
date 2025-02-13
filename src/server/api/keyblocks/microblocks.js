import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { id, limit, queryParameters } = getQuery(event)
  const url = getUrl({
    entity: 'key-blocks',
    id,
    route: 'micro-blocks',
    limit: limit ?? 10,
    queryParameters,
  })
  const { data } = await axios.get(url)
  return adaptKeyblockMicroblocks(data)
})

function adaptKeyblockMicroblocks(microblocks) {
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
