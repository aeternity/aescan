import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)

  // todo chack v2 v3 everywhere
  const url = new URL(`${MIDDLEWARE_URL}/v3/aex9/${query.id}`)
  const { data } = await axios.get(url)
  return data.holders
})
