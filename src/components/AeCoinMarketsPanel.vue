<template>
  <app-panel class="ae-coin-transactions-panel">
    <table>
      <!--      todo add hints-->
      <!--      todo add tests-->
      <tr>
        <th>Exchange name</th>
        <th>Token pair</th>
        <th>Price</th>
        <th>Volume (24h)</th>
      </tr>
      <tr>
        <td>Gate</td>
        <td>AE_USDT</td>
        <td>${{ gate?.high24h }}</td>
        <td>${{ gate?.baseVolume }}</td>
      </tr>
      <tr>
        <td>MEXC</td>
        <td>AE_USDT</td>
        <td>${{ mexc?.lastPrice }}</td>
        <td>${{ mexc?.volume }}</td>
      </tr>
      <tr>
        <td>HotCoin</td>
        <td>AE_USDT</td>
        <td>${{ hotCoin?.high }}</td>
        <td>${{ hotCoin?.vol }}</td>
      </tr>
      <tr>
        <td>CoinStore</td>
        <td>AE_USDT</td>
        <td>${{ coinStore?.high }}</td>
        <td>${{ coinStore?.volume }}</td>
      </tr>
      <tr>
        <td>CoinW</td>
        <td>AE_USDT</td>
        <td>${{ coinW?.high }}</td>
        <td>${{ coinW?.volume }}</td>
      </tr>
    </table>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAeCoinStore } from '~/stores/aeCoin'

const aeCoinStore = useAeCoinStore()
const { fetchMarketStats } = aeCoinStore
const { gate, mexc, hotCoin, coinStore, coinW } = storeToRefs(aeCoinStore)

await useAsyncData(async() => {
  await fetchMarketStats()
  return true
})

</script>
