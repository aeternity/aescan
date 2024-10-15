import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const url = `${MIDDLEWARE_URL}/v3/transactions`
  const { data } = await axios.get(url)
  return data
})
