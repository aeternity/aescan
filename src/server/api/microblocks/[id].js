import useAxios from '~/composables/useAxios'
import { DateTime } from "luxon";

const { MIDDLEWARE_URL } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')

  const url = new URL(`${MIDDLEWARE_URL}/v3/micro-blocks/${id}`)
  const { data } = await axios.get(url)
  return  adaptMicroblock(data)
})

// todo make it honest
function adaptMicroblock(microblock) {
  return {
    ...microblock,
    time: DateTime.fromMillis(microblock.time).toLocaleString(DateTime.DATETIME_SHORT),
  }
}
