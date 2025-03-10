import { DateTime } from 'luxon'
import { decode, Encoding, isAddressValid } from '@aeternity/aepp-sdk'
import useAxios from '@/composables/useAxios'
import { formatAettosToAe, formatNameState } from '@/utils/format'
import { MINUTES_PER_BLOCK, SPECIAL_POINTERS_PRESET_KEYS } from '@/utils/constants'

const axios = useAxios()

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')

  const [nameDetails, latestKeyblock] = await Promise.all([
    fetchDetails(id),
    fetchLatestKeyblock(),
  ])

  return adaptName(nameDetails, latestKeyblock.height, latestKeyblock.time)
})

async function fetchDetails(id) {
  try {
    const [name, auction] = await Promise.all([
      fetchName(id),
      fetchAuction(id),
    ])
    return name || auction
  } catch (error) {
    if ([400, 404].includes(error.response.status)) {
      return { error: error.response.status }
    }
  }
}

async function fetchName(id) {
  try {
    const url = getUrl({
      entity: 'names',
      id,
    })
    const { data } = await axios.get(url)
    return data
  } catch (e) {
    return null
  }
}

async function fetchAuction(id) {
  try {
    const url = getUrl({
      entity: 'names/auctions',
      id,
    })
    const { data } = await axios.get(url)
    return data
  } catch (e) {
    return null
  }
}

async function fetchLatestKeyblock() {
  const url = getUrl({
    entity: 'key-blocks',
    limit: 1,
  })
  const { data } = await axios.get(url)
  return data.data[0]
}

function adaptName(name, blockHeight, blockTime) {
  const lastBid = name?.lastBid
  const hash = name.hash || name.lastBid.tx.nameId
  const states = formatNameState(name, blockHeight)
  const endHeight = name.auctionEnd
  const ends = name.approximateExpireTime
  const blockCreatedTime = DateTime.fromMillis(blockTime)
  const activated = states.includes('active')
    ? blockCreatedTime.minus({
      minutes: blockHeight - name.activeFrom * MINUTES_PER_BLOCK,
    }).toMillis()
    : null
  const customPointers = name.pointers ? adaptCustomPointers(name.pointers) : null
  const specialPointers = name.pointers?.reduce((acc, pointer) => ({
    ...acc,
    ...(pointer.key === 'account_pubkey' && { account: pointer.id }),
    ...(pointer.key === 'channel' && { channel: pointer.id }),
    ...(pointer.key === 'contract_pubkey' && { contract: pointer.id }),
    ...(pointer.key === 'oracle_pubkey' && { oracle: pointer.id }),
  }), {}) || {}

  return {
    states,
    stateString: getStateString(states).toLowerCase(),
    stateLabel: getStateString(states),
    name: name.name,
    hash,
    active: name.active,
    owner: name?.ownership?.current,
    bidder: lastBid?.tx?.accountId,
    bid: lastBid?.tx.nameFee ? formatAettosToAe(lastBid.tx.nameFee) : null,
    activatedHeight: states.includes('active') ? name.activeFrom : null,
    activated,
    expirationHeight: name.expireHeight,
    expiration: name.approximateExpireTime,
    auctionEndsHeight: endHeight,
    auctionEnds: ends,
    specialPointers,
    customPointers,
  }
}

function getStateString(states) {
  if (states.includes('auction')) {
    return 'Ends'
  }
  if (states.includes('revoked')) {
    return 'Revoked'
  }
  if (states.includes('expired')) {
    return 'Expired'
  }
  return 'Expires'
}

function adaptCustomPointers(allPointers) {
  const customPointers = allPointers.filter(pointer =>
    // separate special and custom pointers
    !SPECIAL_POINTERS_PRESET_KEYS.includes(pointer.key),
  )

  const hasRawPointers = allPointers
    ? allPointers.some(pointer => isAddressValid(pointer.id, Encoding.Bytearray))
    : null

  return customPointers.map(pointer => {
    return {
      key: pointer.key,
      pointer: hasRawPointers ? decode(pointer.id).toString() : pointer.id,
      isRawPointer: hasRawPointers,
    }
  })
}
