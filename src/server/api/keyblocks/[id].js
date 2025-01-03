import { Encoding, isAddressValid } from '@aeternity/aepp-sdk'
import { DateTime } from 'luxon'
import { formatAettosToAe } from '~/utils/format'
import useAxios from '~/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')
  // todo try promise
  const data = await fetchIt(id)
  if (data.height) {
    const keyblockDeltaStats = await fetchKeyblockDeltaStats(data.height)
    return adaptKeyblock(data, keyblockDeltaStats)
  }
  return adaptKeyblock(data)
})

async function fetchIt(id) {
  try {
    const url = new URL(`${MIDDLEWARE_URL}/v3/key-blocks/${id}`)
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    if ([400, 404].includes(error.response.status)) {
      const isKeyblockIdValid = isAddressValid(id, Encoding.KeyBlockHash) || !isNaN(id)
      if (isKeyblockIdValid) {
        return { isExistent: false }
      } else {
        throw showError({
          data: {
            entityId: id,
            entityName: 'Keyblock',
          },
          statusMessage: 'EntityDetailsNotFound',
        })
      }
    }
  }
}

async function fetchKeyblockDeltaStats(keyblockHeight) {
  const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/delta?scope=gen:${keyblockHeight}`)
  return data?.data?.[0]
}

function adaptKeyblock(keyblock, keyblockDeltaStats = null) {
  // todo reduce conditions
  if (keyblock) {
    return {
      ...keyblock,
      mined: DateTime.fromMillis(keyblock.time).toLocaleString(DateTime.DATETIME_SHORT),
      blockReward: keyblockDeltaStats ? formatAettosToAe(keyblockDeltaStats.blockReward) : null,
      devReward: keyblockDeltaStats ? formatAettosToAe(keyblockDeltaStats.devReward) : null,
    }
  }

  return keyblock
}
