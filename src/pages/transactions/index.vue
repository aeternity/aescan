<template>
  <Head>
    <Title>Transactions</Title>
  </Head>

  <page-header>
    Transactions
    <template #tooltip>
      {{ transactionsHints.transaction }}
    </template>
  </page-header>
  <transactions-statistics class="transactions-panel"/>
  <transactions-chart-panel
    :has-select="false"
    :range="CHART_INTERVALS_PRESETS_OPTIONS[0]"
    class="transactions-panel"/>
  <transactions-panel
    v-if="!isLoading"
    class="transactions-panel"/>
  <loader-panel v-else/>
</template>

<script setup>
import { transactionsHints } from '@/utils/hints/transactionsHints'
import { CHART_INTERVALS_PRESETS_OPTIONS } from '@/utils/constants'

const { isLoading } = useLoading()
</script>

<style scoped>
.transactions-panel {
  margin-bottom: var(--space-2);

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
