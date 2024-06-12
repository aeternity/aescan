<template>
  <!--  todo condensed table-->
  <app-panel class="ae-coin-transactions-panel">
    <table>
      <!--      todo add tests-->
      <tr>
        <th>
          Market Name
          <hint-tooltip>
            {{ aeCoinHints.marketName }}
          </hint-tooltip>
        </th>
        <th>
          Token Pair
          <hint-tooltip>
            {{ aeCoinHints.pair }}
          </hint-tooltip>
        </th>
        <th>
          Price
          <hint-tooltip>
            {{ aeCoinHints.marketPrice }}
          </hint-tooltip>
        </th>
        <th>
          Volume (24h)
          <hint-tooltip>
            {{ aeCoinHints.volume }}
          </hint-tooltip>
        </th>
      </tr>
      <!--      todo chaining vs loading? -->
      <tr>
        <td>Gate</td>
        <td>AE / USDT</td>
        <td>$ {{ formatNullable(formatNumber(gate?.price)) }}</td>
        <td>$ {{ formatNullable(formatNumber(gate?.volume)) }}</td>
      </tr>

      <tr>
        <td>Mexc</td>
        <td>AE / USDT</td>
        <td>$ {{ formatNullable(formatNumber(mexc?.price)) }}</td>
        <td>$ {{ formatNullable(formatNumber(mexc?.volume)) }}</td>
      </tr>
      <tr>
        <td>HotCoin</td>
        <td>AE / USDT</td>
        <td>$ {{ formatNullable(formatNumber(hotCoin?.price)) }}</td>
        <td>$ {{ formatNullable(formatNumber(hotCoin?.volume)) }}</td>
      </tr>
      <tr>
        <td>CoinStore</td>
        <td>AE / USDT</td>
        <td>$ {{ formatNullable(formatNumber(coinStore?.price)) }}</td>
        <td>$ {{ formatNullable(formatNumber(coinStore?.volume)) }}</td>
      </tr>
      <tr>
        <td>CoinW</td>
        <td>AE / USDT</td>
        <td>$ {{ formatNullable(formatNumber(coinW?.price)) }}</td>
        <td>$ {{ formatNullable(formatNumber(coinW?.volume)) }}</td>
      </tr>
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAeCoinStore } from '~/stores/aeCoin'
import { aeCoinHints } from '~/utils/hints/aeCoinHints'
import { formatNullable, formatNumber } from '~/utils/format'

const aeCoinStore = useAeCoinStore()
const { fetchMarketStats } = aeCoinStore
const {
  gate,
  mexc,
  hotCoin,
  coinStore,
  coinW,
} = storeToRefs(aeCoinStore)

await useAsyncData(async() => {
  await fetchMarketStats()
  return true
})

</script>
