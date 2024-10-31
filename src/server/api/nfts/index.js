import useAxios from '~/composables/useAxios'
import { DateTime } from "luxon";

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const defaultParameters = `/v3/aex141?limit=${query.limit ?? 10}`
  const url = new URL(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)

  const { data } = await axios.get(url)
  return adaptNfts(data)
})

function adaptNfts(nfts) {
  const formattedData = nfts.data
    .map(nft => {
      return {
        name: nft.name,
        blockHeight: nft.blockHeight,
        creationTime: DateTime.fromMillis(nft.creationTime).toLocaleString(DateTime.DATETIME_SHORT),
        contractId: nft.contractId,
        nftsAmount: nft.nftsAmount,
        nftOwners: nft.nftOwners,
      }
    })
  return {
    next: nfts.next,
    data: formattedData,
    prev: nfts.prev,
  }
}
