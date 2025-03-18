import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { queryParameters } = getQuery(event)

  const [nfts, count] = await Promise.all([
    fetchNftsList(queryParameters),
    fetchNftsCount(),
  ])

  return adaptNfts(nfts, count)
})

async function fetchNftsList(queryParameters) {
  const url = getUrl({
    entity: 'aex141',
    parameters: { by: 'creation', direction: 'backward' },
    queryParameters,
  })
  const { data } = await axios.get(url)
  return data
}

async function fetchNftsCount() {
  const url = getUrl({
    entity: 'aex141',
    route: 'count',
  })
  const { data } = await axios.get(url)

  return data.data
}

function adaptNfts(nfts, count) {
  const formattedData = nfts.data
    .map(nft => {
      return {
        name: nft.name,
        blockHeight: nft.blockHeight,
        creationTime: nft.creationTime,
        contractId: nft.contractId,
        nftsAmount: nft.nftsAmount,
        nftOwners: nft.nftOwners,
      }
    })
  return {
    next: nfts.next,
    data: formattedData,
    prev: nfts.prev,
    count,
  }
}
