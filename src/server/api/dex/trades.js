import useAxios from "~/composables/useAxios";
import { MAXIMUM_FRACTION_DIGITS } from "~/utils/constants";
import { BigNumber } from "bignumber.js";
import { DateTime } from "luxon";
import { formatTradeRate, formatTradeValue } from "~/utils/format";
// todo rename component
const { MIDDLEWARE_URL, AE_TOKEN_ID } = useRuntimeConfig().public
const axios = useAxios()

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const defaultParameters = `/v3/dex/swaps?limit=${query.limit ?? 10}`
  const { data } = await axios.get(`${MIDDLEWARE_URL}${query.queryParameters || defaultParameters}`)
  return adaptTrades(data)
})


export function adaptTrades(trades, price) {
  const formattedData = trades.data.map(trade => {
    const fromAmount = trade.fromAmount / 10 ** trade.fromDecimals
    const toAmount = trade.toAmount / 10 ** trade.toDecimals
    return {
      fromAmount,
      toAmount,
      txHash: trade.txHash,
      fromToken: trade.fromToken,
      toToken: trade.toToken,
      fromContract: trade.fromContract,
      toContract: trade.toContract,
      action: trade.action,
      height: trade.height,
      timestamp: DateTime.fromMillis(trade.microTime),
      rate: formatTradeRate(trade.action, fromAmount, toAmount),
      value: formatTradeValue(trade.action, fromAmount, toAmount, price),
    }
  })
  return {
    next: trades.next,
    data: formattedData,
    prev: trades.prev,
  }
}


// todo good for MDW
// todo find all occurences (typically 2 or more params) and report to MDW
