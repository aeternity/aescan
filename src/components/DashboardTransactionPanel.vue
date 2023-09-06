<template>
  <!--  class="dashboard-transactions-panel__panel-header"-->

  <app-panel
    class="dashboard-transactions-panel"
    level="h5"
    :show-all-link="microblockDetailsLink"
    icon-name="transactions">
    <template #title>
      Transactions
    </template>
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

    <div class="dashboard-transactions-panel__summary">
      Displaying
      {{ selectedMicroblockTransactionsCount > 4 ? 'first 4' : '' }}
      transactions of selected microblock
    </div>

    <dashboard-microblock-transactions-table
      v-if="selectedMicroblockTransactions"
      class="dashboard-transactions-panel__transactions-table"
      :transactions="selectedMicroblockTransactions"/>

    <transactions-swiper
      v-if="selectedMicroblockTransactions"
      class="dashboard-transactions-panel__transactions-swiper"
      :transactions="selectedMicroblockTransactions"/>
  </app-panel>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import AppPanel from '@/components/AppPanel'
import TransactionsSwiper from '@/components/TransactionsSwiper'
import { transactionsHints } from '@/utils/hints/transactionsHints'
import { useRecentBlocksStore } from '@/stores/recentBlocks'
import DashboardMicroblockTransactionsTable from '@/components/DashboardMicroblockTransactionsTable'

const {
  selectedMicroblockTransactions,
  selectedMicroblockTransactionsCount,
  selectedMicroblock,
} = storeToRefs(
  useRecentBlocksStore(),
)

const microblockDetailsLink = computed(() => `/microblocks/${selectedMicroblock.value?.hash}`)
</script>

<style scoped>
.dashboard-transactions-panel {
  padding: var(--space-3) var(--space-1);
  @media (--desktop) {
    padding: var(--space-3);
  }

  &__panel-header {
    margin-bottom: var(--space-3);
  }

  &__transactions-swiper {
    @media (--desktop) {
      display: none;
    }
  }

  &__transactions-table {
    display: none;
    @media (--desktop) {
      display: revert;
    }
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
