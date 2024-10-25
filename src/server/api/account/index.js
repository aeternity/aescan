import useAxios from "~/composables/useAxios";
const { NODE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const url = new URL(`${NODE_URL}/v3/accounts/${query.id}`)

  const { data } = await axios.get(url)
  return data
})
