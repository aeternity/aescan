<template>
  <div class="ae-coin-markets-table__container">
    <table>
      <thead>
        <tr>
          <th>
            Name
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
      </thead>
      <tbody>
        <tr>
          <td>Gate.io</td>
          <td>AE / USDT</td>
          <td>$ {{ formatNullable(formatNumber(coinMarkets.gate.price)) }}</td>
          <td>$ {{ formatNullable(formatNumber(coinMarkets.gate.volume)) }}</td>
        </tr>
        <tr>
          <td>Mexc</td>
          <td>AE / USDT</td>
          <td>$ {{ formatNullable(formatNumber(coinMarkets.mexc.price)) }}</td>
          <td>$ {{ formatNullable(formatNumber(coinMarkets.mexc.volume)) }}</td>
        </tr>
        <tr>
          <td>HotCoin</td>
          <td>AE / USDT</td>
          <td>$ {{ formatNullable(formatNumber(coinMarkets.hotcoin.price)) }}</td>
          <td>$ {{ formatNullable(formatNumber(coinMarkets.hotcoin.volume)) }}</td>
        </tr>
        <tr>
          <td>CoinStore</td>
          <td>AE / USDT</td>
          <td>$ {{ formatNullable(formatNumber(coinMarkets.coinstore.price)) }}</td>
          <td>$ {{ formatNullable(formatNumber(coinMarkets.coinstore.volume)) }}</td>
        </tr>
        <tr>
          <td>CoinW</td>
          <td>AE / USDT</td>
          <td>$ {{ formatNullable(formatNumber(coinMarkets.coinw.price)) }}</td>
          <td>$ {{ formatNullable(formatNumber(coinMarkets.coinw.volume)) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { aeCoinHints } from '@/utils/hints/aeCoinHints'

defineProps({
  coinMarkets: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.ae-coin-markets-table__container {
  overflow-x: auto;
}
</style>
