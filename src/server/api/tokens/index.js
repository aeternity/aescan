import useAxios from '~/composables/useAxios'
import { useRuntimeConfig } from "nuxt/app";

const { MIDDLEWARE_URL, DEX_BACKEND_URL } = useRuntimeConfig().public
const axios = useAxios()
export default defineEventHandler(async (event) => {
    return Promise.allSettled([
      fetchAllTokens(''),
      fetchListedTokens(),
    ])
  }
)


async function fetchAllTokens(queryParameters = null) {
  const { data } = await axios.get(`${MIDDLEWARE_URL}${queryParameters || '/v3/aex9?by=name&direction=forward'}`)
  console.log('fetchAllTokens', data)

  return data
}

async function fetchListedTokens() {
  const { data } = await axios.get(`${DEX_BACKEND_URL}/tokens/listed`)
  console.log('fetchListedTokens', data)

  return adaptListedTokens(data)
}




export function adaptListedTokens(tokens) {
  const formattedData = tokens
    .map(token => {
      return {
        contractId: token.address,
        name: token.name,
        symbol: token.symbol,
        isAe: token.address === useRuntimeConfig().public.AE_TOKEN_CONTRACT_ID,
      }
    })

  return {
    next: null,
    data: formattedData,
    prev: null,
  }
}
