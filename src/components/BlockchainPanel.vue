<template>
  <app-panel class="blockchain-panel">
    <div class="blockchain-panel__container">
      <panel-header
        level="h3"
        class="blockchain-panel__panel-header"
        title="Keyblocks"
        icon-name="latest-keyblock">
        <template #header>
          <div class="blockchain-panel__summary blockchain-panel__summary--desktop">
            Microblocks in selected keyblock:
            <span class="blockchain-panel__count">
              {{ selectedKeyblock?.micro_blocks_count }}
            </span>
          </div>
          <div class="blockchain-panel__summary blockchain-panel__summary--desktop">
            Total transactions in selected keyblock:
            <span class="blockchain-panel__count">
              {{ selectedKeyblockTransactionsCount }}
            </span>
          </div>
        </template>
        <template #tooltip>
          Unlike in Bitcoin, (key)blocks do not directly include any transaction. Instead, a mined keyblock
          determines a new leader who is then eligible to create new microblocks every 3 seconds which include
          the transactions. On average, a new keyblock is mined every 3 minutes.
        </template>
      </panel-header>

      <keyblock-sequence
        v-if="keyblocks"
        class="blockchain-panel__keyblock-sequence"
        :keyblocks="keyblocks"/>

      <div class="blockchain-panel__summary">
        Microblocks in selected keyblock:
        <span class="blockchain-panel__count">
          {{ selectedKeyblock?.micro_blocks_count }}
        </span>
      </div>
      <div class="blockchain-panel__summary">
        Transactions in this microblock:
        <span class="blockchain-panel__count">
          {{ selectedKeyblockTransactionsCount }}
        </span>
      </div>

      <keyblock-table
        v-if="selectedKeyblock"
        class="blockchain-panel__keyblock-table"
        :keyblock="selectedKeyblock"
        :stats="selectedDeltaStats"/>

      <keyblock-table-condensed
        v-if="selectedKeyblock"
        class="blockchain-panel__keyblock-table-condensed"
        :keyblock="selectedKeyblock"
        :stats="selectedDeltaStats"/>
    </div>
    <dashboard-microblocks-panel class="blockchain-panel__dashboard-microblock-panel"/>
  </app-panel>
</template>

<script>
import { mapState } from 'pinia'
import AppPanel from '@/components/AppPanel'
import KeyblockTableCondensed from '@/components/KeyblockTableCondensed'
import { formatAePrice, formatNullable } from '@/utils/format'
import { useRecentBlocksStore } from '@/stores/recentBlocks'
import KeyblockTable from '@/components/KeyblockTable'
import PanelHeader from '@/components/PanelHeader'
import KeyblockSequence from '@/components/KeyblockSequence'
import DashboardMicroblocksPanel from '@/components/DashboardMicroblocksPanel'

export default {
  name: 'BlockchainPanel',
  components: {
    DashboardMicroblocksPanel,
    KeyblockSequence,
    PanelHeader,
    KeyblockTable,
    KeyblockTableCondensed,
    AppPanel,
  },
  computed: {
    ...mapState(useRecentBlocksStore, [
      'keyblocks',
      'selectedKeyblock',
      'selectedDeltaStats',
      'selectedKeyblockTransactionsCount',
    ]),
  },
  methods: {
    formatNullable,
    formatAePrice,
  },
}
</script>

<style scoped>
.blockchain-panel {
  &__container {
    padding: var(--space-4) var(--space-1) var(--space-1);
    @media (--desktop) {
      padding: var(--space-4) var(--space-4) var(--space-1);
    }
  }

  &__panel-header {
    margin-bottom: var(--space-3);
    @media (--desktop) {
      margin-bottom: var(--space-4);
    }
  }

  &__keyblock-table {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__keyblock-table-condensed {
    @media (--desktop) {
      display: none;
    }
  }

  &__keyblock-sequence {
    margin-bottom: var(--space-3);
  }

  &__dashboard-microblock-panel {
    margin: 0 var(--space-2) var(--space-1);
    @media (--desktop) {
      margin: 0 var(--space-4) var(--space-4);
    }
  }

  &__summary {
    font-family: var(--font-monospaced);
    font-size: 12px;
    line-height: 20px;
    display: block;
    margin-bottom: var(--space-3);

    &:last-of-type {
      margin-bottom: var(--space-1);
      @media (--desktop) {
        margin-bottom: 0;
      }
    }

    @media (--desktop) {
      margin-bottom: 0;
      display: none;
    }
  }

  &__summary--desktop {
    display: none;
    font-size: 14px;

    @media (--desktop) {
      display: block;
    }
  }

  &__count {
    font-weight: 700;
  }
}
</style>
