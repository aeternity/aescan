import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async() => {
  const url = new URL(`${MIDDLEWARE_URL}/v3/stats/total?limit=1`)
  const { data } = await axios.get(url)

  return data.data[0]
})
