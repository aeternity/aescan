import useAxios from "~/composables/useAxios";
// todo rename component
const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)

  // todo /accounts/{accountId}/transactions/count
  const url = new URL(`${MIDDLEWARE_URL}/v3/transactions/count`)

  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })
  const { data } = await axios.get(url)

  return data
})
