import useAxios from "~/composables/useAxios";
import { MAXIMUM_FRACTION_DIGITS } from "~/utils/constants";
import { BigNumber } from "bignumber.js";
// todo rename component
const { DEX_BACKEND_URL, AE_TOKEN_ID } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)

  if (query.tokenId === AE_TOKEN_ID) {
    return 1
  }

  const url = new URL(`${DEX_BACKEND_URL}/pairs/swap-routes/${query.tokenId}/${AE_TOKEN_ID}`)
  const { data } = await axios.get(url)


  if (data.length === 0) {
    return false
  }

  const ratio = reduceTokenPairRatioWithDecimals(
    convertTokenPairRouteAsRatio(data[0]),
    {
      decimalsA: MAXIMUM_FRACTION_DIGITS,
      decimalsB: query.tokenDecimals,
    },
  )

  return data[0][0].token0 === AE_TOKEN_ID
    ? (new BigNumber(1)).dividedBy(ratio).toNumber()
    : ratio.toNumber()
})


function convertTokenPairRouteAsRatio(route) {
  return route
    .map(step => [
      step.liquidityInfo.reserve0,
      step.liquidityInfo.reserve1,
    ])
    .reduce(
      (ratio, [reserveA, reserveB]) => ratio.multipliedBy(BigNumber(reserveB).div(reserveA)),
      new BigNumber(1),
    )
}

function reduceTokenPairRatioWithDecimals(
  ratio,
  { decimalsA, decimalsB },
) {
  return ratio.shiftedBy(decimalsA - decimalsB)
}


// todo ale tohle je adaptovani nebo formatovani
