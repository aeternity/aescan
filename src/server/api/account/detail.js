import { isAddressValid } from '@aeternity/aepp-sdk'
import { formatAettosToAe } from '~/utils/format'
import useAxios from '~/composables/useAxios'

const { NODE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const data = await fetchIt(query.id)

  return adaptKeyblock(data)
})

async function fetchIt(accountId) {
  try {
    const url = new URL(`${NODE_URL}/v3/accounts/${accountId}`)
    const { data } = await axios.get(url)
    return data
  } catch (e) {
    if ([400, 404].includes(e.response.status)) {
      if (isAddressValid(accountId)) {
        return { id: accountId, isExistent: false }
      } else {
        throw showError({
          data: {
            entityId: accountId,
            entityName: 'Account',
          },
          statusMessage: 'EntityDetailsNotFound',
        })
      }
    }
  }
}

function adaptKeyblock(data) {
  if (data) {
    return {
      ...data,
      balance: formatAettosToAe(data.balance),
      isGeneralized: data.kind === 'generalized',
    }
  } else {
    return null
  }
}
