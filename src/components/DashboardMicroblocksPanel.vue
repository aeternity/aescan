<template>
  <app-panel class="dashboard-microblocks-panel">
    <div class="dashboard-microblocks-panel__container">
      <dashboard-panel-header
        level="h4"
        class="dashboard-microblocks-panel__dashboard-panel-header"
        title="MICROBLOCKS"
        icon-name="microblocks">
        <template #tooltip>
          {{ microblocksHints.microblock }}
        </template>
        <template
          v-if="selectedMicroblockTransactionsCount > 0"
          #header>
          <div
            class="dashboard-microblocks-panel__summary dashboard-microblocks-panel__summary--desktop">
            Transactions in this microblock:
            <span class="dashboard-microblocks-panel__count">
              {{ selectedMicroblockTransactionsCount }}
            </span>
          </div>
        </template>
      </dashboard-panel-header>

      <div class="dashboard-microblocks-panel__summary">
        Transactions in this microblock:
        <span class="dashboard-microblocks-panel__count">
          {{ selectedMicroblockTransactionsCount }}
        </span>
      </div>
    </div>
    <microblocks-sequence
      v-if="selectedKeyblockMicroblocks.length > 0"
      class="dashboard-microblocks-panel__microblock-sequence"
      :microblocks="selectedKeyblockMicroblocks"/>
    <dashboard-transaction-panel v-if="selectedKeyblockMicroblocks.length > 0"/>
    <blank-state v-else/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { microblocksHints } from '@/utils/hints/microblocksHints'

const { selectedKeyblockMicroblocks, selectedMicroblockTransactionsCount } =
  storeToRefs(useRecentBlocksStore())
</script>

<style scoped>
.dashboard-microblocks-panel {
  background: var(--color-snow);
  padding: var(--space-3) var(--space-1) var(--space-1);

  @media (--desktop) {
    padding: var(--space-3) var(--space-3) var(--space-3);
  }

  &__dashboard-panel-header {
    margin-bottom: var(--space-2);

    @media (--desktop) {
      margin-bottom: var(--space-3);
    }
  }

  &__microblock-sequence {
    margin-bottom: var(--space-3);
  }

  &__summary {
    display: block;
    margin-bottom: var(--space-3);
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
