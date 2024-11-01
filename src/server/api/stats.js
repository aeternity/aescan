import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async () => {
  // todo is V3 needed?
  const url = new URL(`${MIDDLEWARE_URL}/v3/stats`)
  const { data } = await axios.get(url)

  return data
})
