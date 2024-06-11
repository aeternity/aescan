<template>
  <!--  todo condensed table-->
  <app-panel class="ae-coin-transactions-panel">
    <table>
      <!--      todo add hints-->
      <!--      todo add tests-->
      <tr>
        <th>Market Name</th>
        <th>Token Pair</th>
        <th>Price</th>
        <th>Volume (24h)</th>
      </tr>
      <!--      todo chaining? -->
      <tr
        v-for="(market, index) in aeCoinMarketStats"
        :key="index">
        <td>{{ market?.name || '---' }}</td>
        <td>AE / USDT</td>
        <td>$ {{ market?.price }}</td>
        <td>$ {{ market?.volume }}</td>
      </tr>
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAeCoinStore } from '~/stores/aeCoin'

const aeCoinStore = useAeCoinStore()
const { fetchMarketStats } = aeCoinStore
const { aeCoinMarketStats } = storeToRefs(aeCoinStore)
// todo shorten name

await useAsyncData(async() => {
  await fetchMarketStats()
  return true
})

</script>
