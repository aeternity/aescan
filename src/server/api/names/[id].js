import { DateTime } from 'luxon'
import { decode, Encoding, isAddressValid } from '@aeternity/aepp-sdk'
import useAxios from '@/composables/useAxios'
import { formatAettosToAe, formatNameState } from '@/utils/format'
import { MINUTES_PER_BLOCK, SPECIAL_POINTERS_PRESET_KEYS } from '@/utils/constants'

const axios = useAxios()

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')

  const [name, block] = await Promise.all([
    fetchaaa(id),
    fetchKeyblocks(),
  ])
  return adaptName(name[0] || name[1], block.data[0].height, block.data[0].time)
})

async function fetchaaa(id) {
  try {
    const [name, auction] = await Promise.all([
      fetchName(id),
      fetchAuction(id),
    ])
    return [name, auction]
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

async function fetchKeyblocks() {
  const url = getUrl({
    entity: 'key-blocks',
  })
  const { data } = await axios.get(url)
  return data
}

function adaptName(name, blockHeight, blockTime) {
  const lastBid = name?.lastBid
  const hash = name.hash || name.lastBid.tx.nameId
  console.log('hash', hash)

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
  const specialPointers = {
    account: name.pointers ? name.pointers.find(name => name.key === 'account_pubkey')?.id : null,
    channel: name.pointers ? name.pointers.find(name => name.key === 'channel')?.id : null,
    contract: name.pointers ? name.pointers.find(name => name.key === 'contract_pubkey')?.id : null,
    oracle: name.pointers ? name.pointers.find(name => name.key === 'oracle_pubkey')?.id : null,
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
