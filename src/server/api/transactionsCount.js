// todo slozkovani v servers
import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const url = new URL(`${MIDDLEWARE_URL}/v3/transactions/count?tx_type=${Object.keys(query)[0]}`)
  const { data } = await axios.get(url)
  return data
})
