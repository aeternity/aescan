import { DateTime } from 'luxon'
import { decode, Encoding, isAddressValid } from '@aeternity/aepp-sdk'
import useAxios from '@/composables/useAxios'
import { formatAettosToAe, formatNameState } from '@/utils/format'
import { MINUTES_PER_BLOCK, SPECIAL_POINTERS_PRESET_KEYS } from '@/utils/constants'

const axios = useAxios()

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const [nameDetails, latestKeyblock] = await Promise.all([
    fetchDetails(id),
    fetchLatestKeyblock(),
  ])
  if (!nameDetails) {
    return { error: 404 }
  }
  return adaptName(nameDetails, latestKeyblock.height, latestKeyblock.time)
})

async function fetchDetails(id) {
  const [name, auction] = (await Promise.allSettled([
    fetchName(id),
    fetchAuction(id),
  ])).map(result => result.value)
  return name ?? auction
}

async function fetchName(id) {
  const url = getUrl({
    entity: 'names',
    id,
  })
  const { data } = await axios.get(url)
  return data
}

async function fetchAuction(id) {
  const url = getUrl({
    entity: 'names/auctions',
    id,
  })
  const { data } = await axios.get(url)
  return data
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
  const lastBid = name.lastBid
  const hash = name.hash ?? name.lastBid.tx.nameId
  const states = formatNameState(name, blockHeight)
  const endHeight = name.auctionEnd
  const ends = name.approximateExpireTime
  const blockCreatedTime = DateTime.fromMillis(blockTime)
  const activated = states.includes('active')
    ? blockCreatedTime.minus({
        minutes: blockHeight - name.activeFrom * MINUTES_PER_BLOCK,
      }).toMillis()
    : null
  name.pointers ??= []

  const customPointers = adaptCustomPointers(name.pointers)
  const specialPointers = adaptSpecialPointers(name.pointers)

  return {
    states,
    stateString: getStateString(states).toLowerCase(),
    stateLabel: getStateString(states),
    name: name.name,
    hash,
    active: name.active,
    owner: name.ownership?.current,
    bidder: lastBid?.tx.accountId,
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

function adaptSpecialPointers(pointers) {
  const specialPointers = {}

  SPECIAL_POINTERS_PRESET_KEYS.forEach((key) => {
    const propertyName = key.includes('_pubkey') ? key.split('_')[0] : key
    specialPointers[propertyName] = pointers
      ? pointers.find(pointer => pointer.key === key)?.id || null
      : null
  })
  return specialPointers
}

function adaptCustomPointers(allPointers) {
  const customPointers = allPointers.filter(pointer =>
    // separate special and custom pointers
    !SPECIAL_POINTERS_PRESET_KEYS.includes(pointer.key),
  )

  const hasRawPointers = allPointers
    ? allPointers.some(pointer => isAddressValid(pointer.id, Encoding.Bytearray))
    : null

  return customPointers.map((pointer) => {
    return {
      key: pointer.key,
      pointer: hasRawPointers ? decode(pointer.id).toString() : pointer.id,
      isRawPointer: hasRawPointers,
    }
  })
}
