<template>
  <Head>
    <Title>Dex Tracker</Title>
  </Head>

  <page-header>
    Dex Trades
    <template #tooltip>
      {{ dexTradesHints.dexTrades }}
    </template>
  </page-header>

  <div class="dex-trades-charts">
    <dex-price-chart-panel/>
    <dex-tvl-chart-panel/>
    <dex-volume-chart-panel/>
  </div>

  <dex-trades-panel v-if="!isLoading"/>
  <loader-panel v-else/>
</template>

<script setup>
import { dexTradesHints } from '@/utils/hints/dexTradesHints'

const { isLoading } = useLoading()
</script>

<style scoped>
.dex-trades-charts {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}
</style>
