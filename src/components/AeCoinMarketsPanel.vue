<template>
  <app-panel class="ae-coin-transactions-panel">
    <loader-indicator v-if="isLoading"/>
    <template v-else>
      <ae-coin-markets-table
        class="u-hidden-mobile"
        :gate="coinMarkets.gate"
        :mexc="coinMarkets.mexc"
        :hot-coin="coinMarkets.hotcoin"
        :coin-store="coinMarkets.coinstore"
        :coin-w="coinMarkets.coinw"/>
      <ae-coin-markets-table-condensed
        class="u-hidden-desktop"
        :gate="coinMarkets.gate"
        :mexc="coinMarkets.mexc"
        :hot-coin="coinMarkets.hotcoin"
        :coin-store="coinMarkets.coinstore"
        :coin-w="coinMarkets.coinw"/>
      <!--      todo so many params-->
    </template>
  </app-panel>
</template>

<script setup>
const { fetchMarketStats } = useAeCoinStore()
const { isLoading, coinMarkets } = storeToRefs(useAeCoinStore())

await useAsyncData(async() => {
  await fetchMarketStats()
  return true
})

</script>
