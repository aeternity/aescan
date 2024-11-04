import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL, NODE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')
  const stats = await Promise.all([
    fetchTotalStats(id),
    fetchMaxTps(id),
    fetchTotalTransactionsCount(id),
  ])
  return stats
})



async function fetchTotalStats() {
  const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/total?limit=1`)
  return data
}


async function fetchMaxTps() {
  const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats`)
  return data
}

async function fetchTotalTransactionsCount() {
  const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/transactions/count`)
  return data
}
