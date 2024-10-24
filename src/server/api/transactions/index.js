import useAxios from '~/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const url = new URL(`${MIDDLEWARE_URL}/v3/transactions`)

  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })
  const { data } = await axios.get(url)
  return data
  // return {
  //   hello: 'world'
  // }
})
