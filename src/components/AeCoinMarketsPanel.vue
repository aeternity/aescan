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
import { aeCoinHints } from '~/utils/hints/aeCoinHints'

const aeCoinStore = useAeCoinStore()
const { fetchMarketStats } = aeCoinStore
const { aeCoinMarketStats } = storeToRefs(aeCoinStore)
// todo shorten name

await useAsyncData(async() => {
  await fetchMarketStats()
  return true
})

</script>
