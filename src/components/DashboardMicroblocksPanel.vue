<template>
  <app-panel class="dashboard-microblocks-panel">
    <div class="dashboard-microblocks-panel__container">
      <panel-header
        level="h4"
        class="dashboard-microblocks-panel__panel-header"
        title="Microblocks"
        icon-name="microblocks">
        <template #tooltip>
          Microblocks can be created every 3 seconds by the current leader, are linked to a specific keyblock
          and include all types of on-chain transactions. The next leader is incentivized to keep the
          microblocks in the blockchain as he receives 40% of the fees of the transactions.
        </template>
        <template #header>
          <div class="dashboard-microblocks-panel__summary dashboard-microblocks-panel__summary--desktop">
            Transactions in this microblock:
            <span class="dashboard-microblocks-panel__count">
              {{ selectedMicroblockTransactionsCount }}
            </span>
          </div>
        </template>
      </panel-header>

      <div class="dashboard-microblocks-panel__summary">
        Transactions in this microblock:
        <span class="dashboard-microblocks-panel__count">
          {{ selectedMicroblockTransactionsCount }}
        </span>
      </div>
    </div>

    <microblocks-sequence
      v-if="selectedKeyblockMicroblocks"
      class="dashboard-microblocks-panel__microblock-sequence"
      :microblocks="selectedKeyblockMicroblocks"/>
    <dashboard-transaction-panel/>
  </app-panel>
</template>

<script>
import { mapState } from 'pinia'
import AppPanel from '@/components/AppPanel'
import DashboardTransactionPanel from '@/components/DashboardTransactionPanel'
import MicroblocksSequence from '@/components/MicroblocksSequence'
import PanelHeader from '@/components/PanelHeader'
import { useRecentBlocksStore } from '@/stores/recentBlocks'

export default {
  name: 'DashboardMicroblocksPanel',
  components: { AppPanel, DashboardTransactionPanel, MicroblocksSequence, PanelHeader },

  computed: {
    ...mapState(useRecentBlocksStore, [
      'selectedKeyblockMicroblocks',
      'selectedMicroblockTransactionsCount',
    ]),
  },
}
</script>

<style scoped>
.dashboard-microblocks-panel {
  background: var(--color-snow);
  padding: var(--space-4) var(--space-1) var(--space-1);

  @media (--desktop) {
    padding: var(--space-3) var(--space-3) var(--space-3);
  }

  &__panel-header {
    margin-bottom: var(--space-3);
  }

  &__microblock-sequence {
    margin-bottom: var(--space-4);

    @media (--desktop) {
      margin-bottom: var(--space-3);
    }
  }

  &__summary {
    display: block;
    margin-bottom: var(--space-4);
    font-family: var(--font-monospaced);
    font-size: 14px;
    line-height: 20px;
    @media (--desktop) {
      margin-bottom: 0;
      display: none;
    }
  }

  &__summary--desktop {
    display: none;
    @media (--desktop) {
      display: block;
    }
  }

  &__count {
    font-weight: 700;
  }
}
</style>
