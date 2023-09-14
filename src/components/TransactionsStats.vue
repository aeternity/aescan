<template>
  <div class="transaction-stats">
    <app-panel class="transaction-stats__panel">
      <h5>TRANSACTIONS</h5>
      <div class="transaction-stats__value">
        {{ formatNumber(transactionsCount) }}
      </div>
    </app-panel>
    <app-panel class="transaction-stats__panel">
      <h5>TRANSACTIONS LAST 24H</h5>
      <div class="transaction-stats__value">
        {{ formatNumber(lastDayTransactionsCount) }}
        <app-chip :variant="chipVariant">
          {{ formatNullable(lastDayTransactionsIncrement) }} %
        </app-chip>
      </div>
    </app-panel>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useBlockchainStatsStore } from '~/stores/blockchainStats'
import { useTransactionsStore } from '~/stores/transactions'
import { formatNullable, formatNumber } from '~/utils/format'

const { fetchTotalTransactionsCount } = useBlockchainStatsStore()
const { fetchDailyTransactions } = useTransactionsStore()

const { transactionsCount } = storeToRefs(useBlockchainStatsStore())
const { lastDayTransactionsIncrement, lastDayTransactionsCount } = storeToRefs(useTransactionsStore())

await fetchTotalTransactionsCount()
await fetchDailyTransactions()

const chipVariant = computed(() => lastDayTransactionsIncrement.value > 0 ? 'success' : 'error')

</script>

<style scoped>
.transaction-stats {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;

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
