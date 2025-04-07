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
        Total transactions in selected keyblock:
        <span class="dashboard-keyblock-panel__count">
          {{ selectedKeyblockTransactionsCount }}
        </span>
      </div>

      <dashboard-keyblock-table
        v-if="selectedKeyblock"
        class="dashboard-keyblock-panel__dashboard-keyblock-table u-hidden-mobile"
        :keyblock="selectedKeyblock"
        :stats="selectedDeltaStats"/>

      <dashboard-keyblock-table-condensed
        v-if="selectedKeyblock"
        class="dashboard-keyblock-panel__dashboard-keyblock-table  u-hidden-desktop"
        :keyblock="selectedKeyblock"
        :stats="selectedDeltaStats"/>
    </div>
    <dashboard-microblocks-panel class="dashboard-keyblock-panel__dashboard-microblocks-panel"/>
  </app-panel>
</template>

<script setup>
import { keyblocksHints } from '@/utils/hints/keyblocksHints'

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
  padding: var(--space-4) 0 0 0;

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__container {
    @media (--desktop) {
      padding-bottom: var(--space-3);
    }
  }

  &__dashboard-panel-header {
    margin: 0 var(--space-1) var(--space-0) var(--space-1);

    @media (--desktop) {
      margin: 0 0 var(--space-4) 0;
    }
  }

  &__dashboard-keyblock-table {
    margin-bottom: var(--space-2);
  }

  &__keyblock-sequence {
    margin-bottom: var(--space-3);

    @media (--desktop) {
      margin-bottom: var(--space-4);
    }
  }

  &__dashboard-microblocks-panel {
    margin: 0 var(--space-1) var(--space-1);

    @media (--desktop) {
      margin: 0;
    }
  }

  &__summary {
    font-family: var(--font-monospaced);
    font-size: 12px;
    line-height: 20px;
    display: block;

    margin: 0 var(--space-1) var(--space-1) var(--space-1);

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
