<template>
  <app-panel class="dashboard-keyblock-panel">
    <div class="dashboard-keyblock-panel__container">
      <dashboard-panel-header
        level="h3"
        class="dashboard-keyblock-panel__dashboard-panel-header"
        title="KEYBLOCKS"
        icon-name="latest-keyblock">
        <template #header>
          <div class="dashboard-keyblock-panel__summary dashboard-keyblock-panel__summary--desktop">
            Microblocks in selected keyblock:
            <span class="dashboard-keyblock-panel__count">
              {{ selectedKeyblock?.microBlocksCount }}
            </span>
          </div>
          <div class="dashboard-keyblock-panel__summary dashboard-keyblock-panel__summary--desktop">
            Total transactions in selected keyblock:
            <span class="dashboard-keyblock-panel__count">
              {{ selectedKeyblockTransactionsCount }}
            </span>
          </div>
        </template>
        <template #tooltip>
          {{ keyblocksHints.keyblock }}
        </template>
      </dashboard-panel-header>

      <keyblock-sequence
        v-if="keyblocks"
        class="dashboard-keyblock-panel__keyblock-sequence"
        :keyblocks="keyblocks"/>

      <div class="dashboard-keyblock-panel__summary">
        Microblocks in selected keyblock:
        <span class="dashboard-keyblock-panel__count">
          {{ selectedKeyblock?.microBlocksCount }}
        </span>
      </div>
      <div class="dashboard-keyblock-panel__summary">
        Transactions in this microblock:
        <span class="dashboard-keyblock-panel__count">
          {{ selectedKeyblockTransactionsCount }}
        </span>
      </div>

      <keyblock-table
        v-if="selectedKeyblock"
        class="dashboard-keyblock-panel__keyblock-table"
        :keyblock="selectedKeyblock"
        :stats="selectedDeltaStats"/>

      <keyblock-table-condensed
        v-if="selectedKeyblock"
        class="dashboard-keyblock-panel__keyblock-table-condensed"
        :keyblock="selectedKeyblock"
        :stats="selectedDeltaStats"/>
    </div>
    <dashboard-microblocks-panel/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { keyblocksHints } from '@/utils/hints/keyblocksHints'
import AppPanel from '@/components/AppPanel'
import KeyblockTableCondensed from '@/components/KeyblockTableCondensed'
import { useRecentBlocksStore } from '@/stores/recentBlocks'
import KeyblockTable from '@/components/KeyblockTable'
import KeyblockSequence from '@/components/KeyblockSequence'
import DashboardMicroblocksPanel from '@/components/DashboardMicroblocksPanel'

const {
  keyblocks,
  selectedKeyblock,
  selectedDeltaStats,
  selectedKeyblockTransactionsCount,
} = storeToRefs(useRecentBlocksStore())
</script>

<style scoped>
.dashboard-keyblock-panel {
  width: 100%;

  &__container {
    @media (--desktop) {
      padding-bottom: var(--space-3);
    }
  }

  &__dashboard-panel-header {
    margin-bottom: var(--space-2);
    @media (--desktop) {
      margin-bottom: var(--space-4);
    }
  }

  &__keyblock-table {
    display: none;
    @media (--desktop) {
      display: revert;
      margin-bottom: var(--space-2);
    }
  }

  &__keyblock-table-condensed {
    margin: var(--space-4) 0;
    @media (--desktop) {
      margin: 0;
      display: none;
    }
  }

  &__keyblock-sequence {
    margin-bottom: var(--space-3);
    @media (--desktop) {
      margin-bottom: var(--space-4);
    }
  }

  &__summary {
    font-family: var(--font-monospaced);
    font-size: 12px;
    line-height: 20px;
    display: block;

    margin-bottom: var(--space-1);
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
