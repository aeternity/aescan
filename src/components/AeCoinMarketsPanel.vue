<template>
  <!--  todo condition-->
  <app-panel
    v-if="rawMarketstats"
    class="ae-coin-transactions-panel">
    <table>
      <!--      todo add hints-->
      <!--      todo add tests-->
      <tr>
        <th>Exchange name</th>
        <th>Token pair</th>
        <th>Price</th>
        <th>Volume (24h)</th>
      </tr>
      <tr
        v-for="(stat, index) in rawMarketstats"
        :key="index">
        <td>aaaaaaa</td>
        <td>AE_USDT</td>
        <td>{{ stat?.price }}</td>
        <td>{{ stat?.volume }}</td>
      </tr>
      <!--      <tr>-->
      <!--        <td>Gate</td>-->
      <!--        <td>AE_USDT</td>-->
      <!--        <td>${{ rawMarketstats?.gate?.high24h }}</td>-->
      <!--        <td>${{ rawMarketstats?.gate?.baseVolume }}</td>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td>MEXC</td>-->
      <!--        <td>AE_USDT</td>-->
      <!--        <td>${{ rawMarketstats?.mexc?.lastPrice }}</td>-->
      <!--        <td>${{ rawMarketstats?.mexc?.volume }}</td>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td>CoinStore</td>-->
      <!--        <td>AE_USDT</td>-->
      <!--        <td>${{ rawMarketstats?.coinStore?.high }}</td>-->
      <!--        <td>${{ rawMarketstats?.coinStore?.volume }}</td>-->
      <!--      </tr>-->
      <!--      <tr>-->
      <!--        <td>HotCoin</td>-->
      <!--        <td>AE_USDT</td>-->
      <!--        <td>${{ rawMarketstats?.hotCoin?.high }}</td>-->
      <!--        <td>${{ rawMarketstats?.hotCoin?.vol }}</td>-->
      <!--      </tr>-->

      <!--      <tr>-->
      <!--        <td>CoinW</td>-->
      <!--        <td>AE_USDT</td>-->
      <!--        <td>${{ rawMarketstats?.coinW?.high }}</td>-->
      <!--        <td>${{ rawMarketstats?.coinW?.volume }}</td>-->
      <!--      </tr>-->
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAeCoinStore } from '~/stores/aeCoin'

const aeCoinStore = useAeCoinStore()
const { fetchMarketStats } = aeCoinStore
const { rawMarketstats } = storeToRefs(aeCoinStore)

await useAsyncData(async() => {
  await fetchMarketStats()
  return true
})

</script>
