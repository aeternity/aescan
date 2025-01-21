<template>
  <app-panel class="ae-coin-transactions-panel">
    <loader-indicator v-if="isLoading"/>
    <template v-else>
      <ae-coin-markets-table
        class="u-hidden-mobile"
        :gate="gate"
        :mexc="mexc"
        :hot-coin="hotCoin"
        :coin-store="coinStore"
        :coin-w="coinW"/>
      <ae-coin-markets-table-condensed
        class="u-hidden-desktop"
        :gate="gate"
        :mexc="mexc"
        :hot-coin="hotCoin"
        :coin-store="coinStore"
        :coin-w="coinW"/>
    </template>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAeCoinStore } from '@/composables/aeCoin'

const aeCoinStore = useAeCoinStore()
const { fetchMarketStats } = aeCoinStore
const {
  gate,
  mexc,
  hotCoin,
  coinStore,
  coinW,
  isLoading,
} = storeToRefs(aeCoinStore)

await useAsyncData(async() => {
  await fetchMarketStats()
  return true
})

</script>
