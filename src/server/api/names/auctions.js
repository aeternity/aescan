import useAxios from '@/composables/useAxios'
import { formatAettosToAe } from '@/utils/format'

const axios = useAxios()

export default defineEventHandler(async (event) => {
  const { queryParameters } = getQuery(event)

  const url = getUrl({
    entity: 'names',
    route: 'auctions',
    parameters: { by: 'expiration', direction: 'forward' },
    queryParameters,
  })
  const { data } = await axios.get(url)
  return adaptInAuctionNames(data)
})

function adaptInAuctionNames(names) {
  const formattedData = names.data.map((name) => ({
    name: name.name,
    highestBidder: name.lastBid.tx.accountId,
    bid: formatAettosToAe(name.lastBid.tx.nameFee),
    bidCount: name.claimsCount,
    expirationHeight: name.auctionEnd,
    expiration: name.approximateExpireTime,
  }))
  return {
    next: names.next,
    data: formattedData,
    prev: names.prev,
  }
}
