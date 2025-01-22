<template>
  <app-panel class="ae-coin-transactions-panel">
    <table>
      <tr>
        <th>Token</th>
        <th>Pair</th>
        <th>Token Price USD</th>
        <th>TVL</th>
        <th>Volume 24H</th>
        <th>Amount</th>
        <th>Token Contract</th>
      </tr>
      <tr
        v-for="pair in tradingPairs"
        :key="pair.address">
        <td>{{ tokens.find(token => token.address === pair.token0).name }}</td>
        <td>AE / {{ tokens.find(token => token.address === pair.token0).symbol }}</td>
        <td>$ {{ tokens.find(token => token.address === pair.token0).priceUsd }}</td>
        <td>$ {{ pair.tvlUsd }}</td>
        <td>$ {{ pair.volumeUsdDay || 0 }}</td>
        <td>$ {{ pair.volumeUsdAll || 0 }}</td>
        <td>
          <value-hash-ellipsed
            :hash="pair.address"
            :link-to="`/tokens/${pair.address}`"/>
        </td>
      </tr>
    </table>
    aaa
    {{ tradingPairs }}
    bbb
    <br>
    <br>
    <br>
    bbb
    {{ tokens }}
    <!--    <paginated-content-->
    <!--      :entities="transactions"-->
    <!--      @prev-clicked="loadPrevTransactions"-->
    <!--      @next-clicked="loadNextTransactions">-->
    <!--      <transactions-table-->
    <!--        :transactions="transactions"-->
    <!--        class="u-hidden-mobile"/>-->
    <!--      <transactions-table-condensed-->
    <!--        :transactions="transactions"-->
    <!--        class="u-hidden-desktop"/>-->
    <!--    </paginated-content>-->
  </app-panel>
</template>

<script setup>
import { useAeCoinStore } from '@/stores/aeCoin'
// import { isDesktop } from '@/utils/screen'
//
// const transactionsStore = useTransactionsStore()
const { fetchTradingPairs, fetchTokens } = useAeCoinStore()
const { tradingPairs, tokens } = storeToRefs(useAeCoinStore())
//
// const limit = computed(() => isDesktop() ? 10 : 3)
//
async function loadTransactions() {
  await fetchTokens()
  await fetchTradingPairs()
}

await useAsyncData(async() => {
  await loadTransactions()
  return true
})
//
// function loadPrevTransactions() {
//   fetchTradingPairs(transactions.value.prev)
// }
//
// function loadNextTransactions() {
//   fetchTradingPairs(transactions.value.next)
// }
</script>
