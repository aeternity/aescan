import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async (event) => {
  const { name } = getQuery(event)
  try {
    const url = getUrl({ entity: 'names', id: name })
    await axios.get(url)
    return true
  } catch (error) {
    if (error.response.status === 404) {
      return false
    }
    console.error(error)
  }
})
