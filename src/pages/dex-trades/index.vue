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

  <dex-trades-panel v-if="!isLoading"/>
  <loading-panel v-else/>
</template>

<script setup>
import { dexTradesHints } from '@/utils/hints/dexTradesHints'

const { isLoading } = useLoading()
</script>
