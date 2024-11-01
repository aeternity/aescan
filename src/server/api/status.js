import useAxios from '@/composables/useAxios'

const { MIDDLEWARE_URL, NODE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async () => {
  const [mdwStatus, nodeStatus] = await Promise.all([
    fetchMdwStatus(),
    fetchNodeStatus(),
  ])

// todo global naming middleware to mdw



  return [mdwStatus, nodeStatus]
})



async function fetchMdwStatus() {
// todo reduce boilerplate?  return await axios.get(`${MIDDLEWARE_URL}/v3/status`)
  const url = new URL(`${MIDDLEWARE_URL}/v3/status`)
  const { data } = await axios.get(url)
  return data
}

async function fetchNodeStatus() {
  const url = new URL(`${NODE_URL}/v3/status`)
  const { data } = await axios.get(url)
  return data
}
