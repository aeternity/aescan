import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { id, queryParameters } = getQuery(event)
  console.log('id, queryParameters', id, queryParameters)

  const url = getUrl({
    entity: 'accounts',
    id,
    route: 'activities',
    queryParameters,
  })
  const { data } = await axios.get(url)

  return adaptNameActions(data)
})

// todo unite confusing naming

export function adaptNameActions(actions) {
  const formattedData = actions.data.map(action => {
    return {
      type: action.type,
      hash: action.payload.sourceTxHash || action.payload.callTxHash || action.payload.hash,
      createdHeight: action.height,
      payload: action.payload,
      created: action.blockTime,
    }
  })

  return {
    next: actions.next,
    data: formattedData,
    prev: actions.prev,
  }
}
