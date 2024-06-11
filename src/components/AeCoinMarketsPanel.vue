<template>
  <!--  todo condition-->
  <!--  todo condensed table-->
  <app-panel
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
      <!--      todo stat to market-->
      <tr
        v-for="(stat, index) in aeCoinMarketStats"
        :key="index">
        <td>{{ stat.name }}</td>
        <td>AE / USDT</td>
        <td>{{ stat.price }}</td>
        <td>{{ stat.volume }}</td>
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
