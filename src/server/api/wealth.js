import useAxios from '@/composables/useAxios'
import { formatAettosToAe } from "~/utils/format";

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async () => {
// todo better naming

  const [ccc, ddd] = await Promise.all([
    fetchAccounts(),
    fetchTotalStats(),
  ])


  return adaptTopAccounts(ccc, formatAettosToAe(ddd.data[0].totalTokenSupply))

})

async function fetchAccounts() {
  const url = new URL(`${MIDDLEWARE_URL}/v3/wealth`)
  const { data } = await axios.get(url)
  return data
}

async function fetchTotalStats() {
  const { data } = await axios.get(`${MIDDLEWARE_URL}/v3/stats/total?limit=1`)
  return data
  // todo move formatting here
}


function adaptTopAccounts(topAccounts, distribution) {
  return topAccounts
    .slice(0, 100)
    .map((account, index) => {
      return {
        rank: index + 1,
        account: account.account,
        balance: formatAettosToAe(account.balance),
        percentage: (formatAettosToAe(account.balance) * 100 / distribution).toFixed(4),
      }
    })
}
