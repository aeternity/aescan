<template>
  <app-panel class="ae-coin-transactions-panel">
    <loader-indicator v-if="isLoading"/>
    <template v-else>
      <ae-coin-markets-table
        class="u-hidden-mobile"
        :coin-markets="coinMarkets"/>
      <ae-coin-markets-table-condensed
        class="u-hidden-desktop"
        :coin-markets="coinMarkets"/>
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
