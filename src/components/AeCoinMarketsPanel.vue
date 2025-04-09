<template>
  <app-panel class="ae-coin-transactions-panel">
    <loader-indicator v-if="isLoading"/>
    <template v-else>
      <ae-coin-markets-table :coin-markets="coinMarkets"/>
    </template>
  </app-panel>
</template>

<script setup>
const { fetchMarketStats } = useAeCoinStore()
const { isLoading, coinMarkets } = storeToRefs(useAeCoinStore())

useAsyncData(async() => {
  await fetchMarketStats()
  return true
})

</script>
