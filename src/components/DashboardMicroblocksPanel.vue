<template>
  <app-panel class="dashboard-microblocks-panel">
    <div
      class="dashboard-microblocks-panel__connector"
      aria-hidden="true"/>
    <div class="ae-kbsub dashboard-microblocks-panel__sub">
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
      v-if="selectedKeyblockMicroblocks?.length > 0"
      class="dashboard-microblocks-panel__microblock-sequence"
      :microblocks="selectedKeyblockMicroblocks"/>
    <dashboard-transaction-panel
      v-if="selectedKeyblockMicroblocks?.length > 0"
      class="dashboard-microblocks-panel__dasboard-transaction-panel"/>
    <blank-state v-else/>
  </app-panel>
</template>

<script setup>
import { microblocksHints } from '@/utils/hints/microblocksHints'

const {
  selectedKeyblockMicroblocks,
  selectedMicroblockTransactionsCount,
} = storeToRefs(useRecentBlocksStore())
</script>

<style scoped>
.dashboard-microblocks-panel {
  position: relative;
  background: transparent;
  border: none;
  border-radius: 0;

  /* Flush sub-section — override AppPanel's higher-specificity :has(table) padding
     so the microblocks content aligns with the keyblock content above it. */
  padding: var(--space-3) 0 var(--space-1) !important;

  @media (--desktop) {
    padding: 0 !important;
  }

  /* Animated dashed connector linking the keyblock section to the microblocks
     "building" icon-box (aligned with the badge column). Desktop-only — the
     stacked mobile/tablet layout has a variable detail height. */
  &__connector {
    display: none;
    position: absolute;
    width: 2px;
    pointer-events: none;
    z-index: 0;
    background-image: repeating-linear-gradient(
      var(--border) 0,
      var(--border) 5px,
      transparent 5px,
      transparent 9px
    );
    background-size: 2px 14px;
    animation: ae-dash-flow 0.7s linear infinite;

    @media (--desktop) {
      display: block;
      left: 27px;
      top: -175px;
      height: 195px;
    }
  }

  /* "Building" indicator — dashed icon-box on the microblocks header */
  :deep(.badge) {
    border-width: 2px;
    border-style: dashed;
  }

  /* Slight indent for MICROBLOCKS header matching the reference (ae-kbsub margin-left:8px) */
  &__sub {
    margin-left: 8px;
  }

  &__dashboard-panel-header {
    margin: 0 var(--space-1) var(--space-2);

    @media (--desktop) {
      margin: 0 0 14px;
    }
  }

  &__dasboard-transaction-panel {
    margin: var(--space-1) var(--space-1) 0;

    @media (--desktop) {
      margin: var(--space-1) 0;
    }
  }

  &__microblock-sequence {
    margin: 0 var(--space-1) var(--space-3) var(--space-1);

    @media (--desktop) {
      margin: 0 0 var(--space-3);
    }
  }

  &__summary {
    display: block;
    margin: 0 var(--space-1) var(--space-3);
    font-size: 12px;
    line-height: 20px;
    color: var(--text-dim);

    @media (--desktop) {
      margin-bottom: 0;
      display: none;
    }
  }

  &__summary--desktop {
    display: none;
    font-size: 12.5px;
    font-family: var(--font-primary);
    color: var(--text-dim);

    @media (--desktop) {
      display: block;
    }
  }

  &__count {
    font-family: var(--font-monospaced);
    font-weight: 600;
    color: var(--text);
  }
}
</style>
