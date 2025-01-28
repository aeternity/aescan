import { Encoding, isAddressValid } from '@aeternity/aepp-sdk'
import { DateTime } from 'luxon'
import { formatAettosToAe } from '@/utils/format'
import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')
  const keyblockDetails = await fetchKeblockDetails(id)
  let keyblockDeltaStats = null
  if (keyblockDetails.height) {
    keyblockDeltaStats = await fetchKeyblockDeltaStats(keyblockDetails.height)
  const data = await fetchKeblockDetails(id)
  if (!data.height) {
    return data
  }
  return adaptKeyblock(keyblockDetails, keyblockDeltaStats)
})

async function fetchKeblockDetails(id) {
  try {
    const url = getUrl({
      entity: 'key-blocks',
      id,
    })
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    if ([400, 404].includes(error.response.status)) {
      const isKeyblockIdValid = isAddressValid(id, Encoding.KeyBlockHash) || !isNaN(id)
      if (isKeyblockIdValid) {
        return { isExistent: false }
      } else {
        return { error: error.response.status }
      }
    }
  }
}

async function fetchKeyblockDeltaStats(keyblockHeight) {
  const url = getUrl({
    entity: 'stats/delta',
    parameters: { scope: `gen:${keyblockHeight}` },
  })

  const { data } = await axios.get(url)

  return data?.data?.[0]
}

function adaptKeyblock(keyblock, keyblockDeltaStats = null) {
  return {
    ...keyblock,
    mined: keyblock.time,
    blockReward: keyblockDeltaStats ? formatAettosToAe(keyblockDeltaStats.blockReward) : null,
    devReward: keyblockDeltaStats ? formatAettosToAe(keyblockDeltaStats.devReward) : null,
  }
}
