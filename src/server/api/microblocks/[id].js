import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')

  const url = getUrl({
    entity: 'micro-blocks',
    id,
  })
  const { data } = await axios.get(url)
  return adaptMicroblock(data)
})

function adaptMicroblock(microblock) {
  return {
    ...microblock,
    time: microblock.time,
  }
}
