import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  try {
    const id = getRouterParam(event, 'id')

    const url = getUrl({
      entity: 'micro-blocks',
      id,
    })
    const { data } = await axios.get(url)
    return adaptMicroblock(data)
  } catch (error) {
    if ([400, 404].includes(error.response.status)) {
      return { error: error.response.status }
    }
  }
})

function adaptMicroblock(microblock) {
  return {
    ...microblock,
    time: microblock.time,
  }
}
