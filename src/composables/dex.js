import { defineStore } from 'pinia'
import { useRuntimeConfig } from 'nuxt/app'
import { BigNumber } from 'bignumber.js'
import { MAXIMUM_FRACTION_DIGITS } from '@/utils/constants'

export const useDexStore = defineStore('dex', () => {
  const { AE_TOKEN_ID, DEX_BACKEND_URL } = useRuntimeConfig().public
  const axios = useAxios()

  async function fetchPrice(tokenId, tokenDecimals = MAXIMUM_FRACTION_DIGITS) {
    if (tokenId === AE_TOKEN_ID) {
      return 1
    }

    const { data } = await axios.get(`${DEX_BACKEND_URL}/swap-routes/${tokenId}/${AE_TOKEN_ID}`)
    if (data.length === 0) {
      return false
    }

    const ratio = reduceTokenPairRatioWithDecimals(
      convertTokenPairRouteAsRatio(data[0]),
      {
        decimalsA: MAXIMUM_FRACTION_DIGITS,
        decimalsB: tokenDecimals,
      },
    )

    return data[0][0].token0 === AE_TOKEN_ID
      ? (new BigNumber(1)).dividedBy(ratio).toNumber()
      : ratio.toNumber()
  }

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

  return {
    fetchPrice,
  }
})
