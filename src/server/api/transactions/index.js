import useAxios from '~/composables/useAxios'

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async () => {
  console.log('bbbb')

  // todo is V3 needed?
  const url = new URL(`${MIDDLEWARE_URL}/v3/transactions`)
  const { data } = await axios.get(url)
  console.log('data1', data)
  return data
  // return {
  //   hello: 'world'
  // }
})
