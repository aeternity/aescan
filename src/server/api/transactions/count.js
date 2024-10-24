
import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  console.log('query', query)
  // todo can this and the part in store be done simpler?
  const isTypeSelected = !!Object.keys(query).length
  const string = isTypeSelected
    ? `${MIDDLEWARE_URL}/v3/transactions/count?tx_type=${Object.keys(query)[0]}`
    : `${MIDDLEWARE_URL}/v3/transactions/count`
  const url = new URL(string)
  const { data } = await axios.get(url)
  return data
})
