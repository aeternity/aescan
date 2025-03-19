import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { id, queryParameters } = getQuery(event)

  const url = getUrl({
    entity: 'aex141',
    route: 'transfers',
    id,
    queryParameters,
  })

  const { data } = await axios.get(url)
  return adaptNftTransfers(data)
})

function adaptNftTransfers(transfers) {
  const formattedData = transfers.data
    .map(transfer => {
      return {
        txHash: transfer.txHash,
        time: transfer.microTime,
        height: transfer.blockHeight,
        tokenId: transfer.tokenId,
        recipient: transfer.recipient,
        sender: transfer.sender,
      }
    })
  return {
    next: transfers.next,
    data: formattedData,
    prev: transfers.prev,
  }
}
