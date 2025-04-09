<template>
  <div class="transaction-statistics">
    <app-panel class="transaction-statistics__panel">
      <h5>TOTAL TRANSACTIONS</h5>
      <div class="transaction-statistics__value">
        {{ formatNumber(transactionsCount) }}
      </div>
    </app-panel>
    <app-panel class="transaction-statistics__panel">
      <h5>TRANSACTIONS (LAST 24H)</h5>
      <div class="transaction-statistics__value">
        {{ formatNumber(last24hsTransactionsCount) }}
        <trend-chip
          v-if="last24hsTransactionsTrend"
          :delta="last24hsTransactionsTrend"/>
      </div>
    </app-panel>
    <app-panel class="transaction-statistics__panel">
      <h5>AVG TRANSACTION FEE (LAST 24H)</h5>
      <div class="transaction-statistics__value">
        {{ last24hsAverageTransactionFees }}
        <trend-chip
          v-if="feesTrend || feesTrend === 0"
          :delta="feesTrend"/>
      </div>
    </app-panel>
  </div>
</template>

<script setup>

const { fetchTotalTransactionsCount } = useBlockchainStatsStore()
const { fetchLast24hsTransactionsStatistics } = useTransactionsStore()

const { transactionsCount } = storeToRefs(useBlockchainStatsStore())
const {
  last24hsTransactionsCount,
  last24hsTransactionsTrend,
  last24hsAverageTransactionFees,
  feesTrend,
} = storeToRefs(useTransactionsStore())

if (process.client) {
  fetchTotalTransactionsCount()
  fetchLast24hsTransactionsStatistics()
}
</script>

<style scoped>
.transaction-statistics {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
  margin-bottom: var(--space-2);

  @media (--desktop) {
    flex-direction: row;
  }

  &__panel {
    padding: var(--space-4);
    width: 100%;

    @media (--desktop) {
      width: 50%;
    }
  }

  &__value {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    font-size: 36px;
    font-family: var(--font-monospaced);
    font-weight: 400;
    margin-top: var(--space-3);
  }
}
</style>
