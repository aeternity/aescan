<template>
  <app-panel class="dashboard-transactions-panel">
    <panel-header
      level="h5"
      class="dashboard-transactions-panel__panel-header"
      title="Transactions"
      :show-all-link="microblockDetailsLink"
      icon-name="transactions">
      <template #header>
        <div class="dashboard-transactions-panel__summary dashboard-transactions-panel__summary--desktop">
          Displaying transactions of selected microblock
        </div>
      </template>
    </panel-header>

    <div class="dashboard-transactions-panel__summary">
      Displaying transactions of selected microblock
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
import PanelHeader from '@/components/PanelHeader'
import TransactionsSwiper from '@/components/TransactionsSwiper'
import { useRecentBlocksStore } from '@/stores/recentBlocks'
import DashboardMicroblockTransactionsTable from '@/components/DashboardMicroblockTransactionsTable'

const {
  selectedMicroblockTransactions,
  selectedMicroblock,
} = storeToRefs(
  useRecentBlocksStore(),
)

const microblockDetailsLink = computed(() => `/microblocks/${selectedMicroblock.value?.hash}`)
</script>

<style scoped>
.dashboard-transactions-panel {
  background: var(--color-white);
  padding: var(--space-4) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__panel-header {
    margin-bottom: var(--space-3);
    @media (--desktop) {
      margin-bottom: var(--space-0);
    }
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
    margin-bottom: var(--space-1);
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
