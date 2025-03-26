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
          <td class="ae-coin-markets-table__data">
            Gate.io
          </td>
          <td class="ae-coin-markets-table__data">
            AE / USDT
          </td>
          <td class="ae-coin-markets-table__data">
            <price-label
              :price="coinMarkets.gate.price"
              currency="$"/>
          </td>
          <td class="ae-coin-markets-table__data">
            <price-label
              :price="coinMarkets.gate.volume"
              currency="$"/>
            <!--            todo fix dollar sign-->
          </td>
        </tr>
        <tr>
          <td class="ae-coin-markets-table__data">
            Mexc
          </td>
          <td class="ae-coin-markets-table__data">
            AE / USDT
          </td>
          <td class="ae-coin-markets-table__data">
            <price-label
              :price="coinMarkets.mexc.price"
              currency="$"/>
          </td>
          <td class="ae-coin-markets-table__data">
            <price-label
              :price="coinMarkets.mexc.volume"
              currency="$"/>
          </td>
        </tr>
        <tr>
          <td class="ae-coin-markets-table__data">
            HotCoin
          </td>
          <td class="ae-coin-markets-table__data">
            AE / USDT
          </td>
          <td class="ae-coin-markets-table__data">
            <price-label
              :price="coinMarkets.hotcoin.price"
              currency="$"/>
          </td>
          <td class="ae-coin-markets-table__data">
            <price-label
              :price="coinMarkets.hotcoin.volume"
              currency="$"/>
          </td>
        </tr>
        <tr>
          <td class="ae-coin-markets-table__data">
            CoinW
          </td>
          <td class="ae-coin-markets-table__data">
            AE / USDT
          </td>
          <td class="ae-coin-markets-table__data">
            <price-label
              :price="coinMarkets.coinw.price"
              currency="$"/>
          </td>
          <td class="ae-coin-markets-table__data">
            <price-label
              :price="coinMarkets.coinw.volume"
              currency="$"/>
          </td>
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
.ae-coin-markets-table {
  &__data {
    white-space: nowrap;
  }

  &__container {
    overflow-x: auto;
  }
}
</style>
