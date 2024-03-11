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
  <template v-if="!isLoading">
    <transactions-stats class="transactions__transactions-stats"/>
    <transactions-chart-panel class="transactions-panel"/>
    <transactions-panel class="transactions-panel"/>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import TransactionsPanel from '@/components/TransactionsPanel'
import PageHeader from '@/components/PageHeader'
import { transactionsHints } from '@/utils/hints/transactionsHints'
import TransactionsChartPanel from '@/components/TransactionsChartPanel'
import TransactionsStats from '@/components/TransactionsStatistics'

const { isLoading } = useLoading()
</script>

<style scoped>
.transactions-panel {
  margin-bottom: var(--space-2);

  &:last-child {
    margin-bottom: 0;
  }

  &__transactions-stats {
    margin-bottom: var(--space-2);
  }
}
</style>
