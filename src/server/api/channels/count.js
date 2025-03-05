import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { state } = getQuery(event)

  const url = getUrl({
    entity: 'transactions',
    route: 'count',
    params: { tx_type: 'channel_create' },
  })

  const { data } = await axios.get(url)
  return data
})
