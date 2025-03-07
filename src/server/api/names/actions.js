import useAxios from '@/composables/useAxios'

const axios = useAxios()

export default defineEventHandler(async event => {
  const { id, queryParameters } = getQuery(event)
  console.log('id, queryParameters', id, queryParameters)
  const url = getUrl({
    entity: 'names',
    id,
    route: 'history',
    queryParameters,
  })
  const { data } = await axios.get(url)

  return adaptNameActions(data)
})

// todo unite confusing naming
function adaptNameActions(actions) {
  console.log('actions', actions)
  const formattedData = actions.data.map(action => {
    return {
      type: action.type,
      hash: action.sourceTxHash || action.callTxHash || action.hash,
      createdHeight: action.height,
      payload: action.payload,
      created: action.blockTime,
    }
  })
  console.log('[[[[[[[[[[[[[')
  console.log('formattedData', formattedData)
  return {
    next: actions.next,
    data: formattedData,
    prev: actions.prev,
  }
}
