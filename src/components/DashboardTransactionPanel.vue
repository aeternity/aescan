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
          {{ selectedMicroblockTransactionsCount > 4 ? 'first 4' : '' }}
          transactions of selected microblock
        </div>
      </template>
    </dashboard-panel-header>

    <div class="dashboard-transactions-panel__summary">
      Displaying
      {{ selectedMicroblockTransactionsCount > 4 ? 'first 4' : '' }}
      transactions of selected microblock
    </div>

    <dashboard-microblock-transactions-table
      v-if="selectedMicroblockTransactions"
      class="u-hidden-mobile"
      :transactions="selectedMicroblockTransactions"/>

    <transactions-swiper
      v-if="selectedMicroblockTransactions"
      class="u-hidden-desktop"
      :transactions="selectedMicroblockTransactions"/>
  </app-panel>
</template>

<script setup>
import { transactionsHints } from '@/utils/hints/transactionsHints'

const {
  selectedMicroblockTransactions,
  selectedMicroblockTransactionsCount,
  selectedMicroblock,
} = storeToRefs(useRecentBlocksStore())

const microblockDetailsLink = computed(() => `/microblocks/${selectedMicroblock.value?.hash}`)
</script>

<style scoped>
.dashboard-transactions-panel {
  padding: var(--space-3) var(--space-1);

  @media (--desktop) {
    padding: var(--space-3);
  }

  &__dashboard-panel-header {
    margin-bottom: var(--space-3);
  }

  &__summary {
    display: block;
    margin-bottom: var(--space-2);
    font-family: var(--font-monospaced);
    font-size: 14px;
    line-height: 20px;

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
}
</style>
