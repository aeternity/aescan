<template>
  <table>
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
</template>

<script setup>
defineProps({
  gate: {
    type: Object,
    required: true,
  },
  mexc: {
    type: Object,
    required: true,
  },
  hotCoin: {
    type: Object,
    required: true,
  },
  coinStore: {
    type: Object,
    required: true,
  },
  coinW: {
    type: Object,
    required: true,
  },
})
</script>
