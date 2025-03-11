import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'keyblockId')
  try {
    const url = getUrl({ entity: 'key-blocks', id })
    await axios.get(url)
    return true
  } catch (error) {
    if (error.response.status === 404) {
      return false
    }
    return null
  }
})
