<template>
  <app-panel class="dashboard-transactions-panel">
    <dashboard-panel-header
      level="h5"
      class="dashboard-transactions-panel__dashboard-panel-header"
      title="TRANSACTIONS"
      :show-all-link="microblockDetailsLink"
      icon-name="transactions">
      <template #tooltip>
        {{ transactionsHints.transaction }}
      </template>
      <template #header>
        <div class="dashboard-transactions-panel__summary dashboard-transactions-panel__summary--desktop">
          Displaying
          {{ selectedMicroblockTransactionsCount > VISIBLE_TRANSACTIONS_LIMIT
            ? `first ${VISIBLE_TRANSACTIONS_LIMIT}`
            : 'all' }}
          transactions of the selected microblock
        </div>
      </template>
    </dashboard-panel-header>

    <div class="dashboard-transactions-panel__summary">
      Displaying
      {{ selectedMicroblockTransactionsCount > VISIBLE_TRANSACTIONS_LIMIT
        ? `first ${VISIBLE_TRANSACTIONS_LIMIT}`
        : 'all' }}
      transactions of the selected microblock
    </div>

    <div class="dashboard-transactions-panel__table-wrap u-hidden-mobile">
      <dashboard-microblock-transactions-table
        v-if="selectedMicroblockTransactions"
        :transactions="selectedMicroblockTransactions"/>
    </div>

    <transactions-swiper
      v-if="selectedMicroblockTransactions"
      class="u-hidden-desktop"
      :transactions="selectedMicroblockTransactions"/>
  </app-panel>
</template>

<script setup>
import { transactionsHints } from '@/utils/hints/transactionsHints'
import { VISIBLE_TRANSACTIONS_LIMIT } from '@/utils/constants'

const {
  selectedMicroblockTransactions,
  selectedMicroblockTransactionsCount,
  selectedMicroblock,
} = storeToRefs(useRecentBlocksStore())

const microblockDetailsLink = computed(() => `/microblocks/${selectedMicroblock.value?.hash}`)
</script>

<style scoped>
.dashboard-transactions-panel {
  /* Flat within the parent keyblock panel — no extra card bg/border.
     The transactions table itself has its own container styling. */
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 0 !important;

  &__dashboard-panel-header {
    margin: 0 var(--space-1) var(--space-2);

    @media (--desktop) {
      margin: 0 0 var(--space-2) 0;
    }
  }

  &__summary {
    display: block;
    margin: 0 var(--space-1) var(--space-2) var(--space-1);
    font-size: 12.5px;
    line-height: 20px;
    color: var(--text-dim);

    @media (--desktop) {
      margin-bottom: 0;
      display: none;
    }
  }

  &__summary--desktop {
    margin-right: var(--space-3);
    display: none;

    @media (--desktop) {
      display: block;
    }
  }

  /* Bordered container for the transactions table — matches reference design */
  &__table-wrap {
    border: 1px solid var(--border);
    border-radius: var(--r-tile);
    overflow: hidden;
  }
}
</style>
