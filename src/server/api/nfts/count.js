import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async () => {
  const url = new URL(`${MIDDLEWARE_URL}/v3/aex141/count`)
  const { data } = await axios.get(url)
  return data.data
})
