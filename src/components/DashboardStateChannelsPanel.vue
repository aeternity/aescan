<template>
  <app-panel class="dashboard-state-channels-panel">
    <dashboard-panel-header
      level="h3"
      title="STATE CHANNELS"
      icon-name="state-channel"
      show-all-link="/state-channels">
      <template #tooltip>
        {{ stateChannelsHints.stateChannel }}
      </template>
    </dashboard-panel-header>

    <p class="dashboard-state-channels-panel__description">
      State Channels allow the gas-free execution of smart contracts and
      transactions, privately and with the speed of light, while still
      being able to escalate on-chain in case of disagreement.
      <app-link to="https://aeternity.com/state-channels">
        Learn more
      </app-link>
    </p>

    <div class="dashboard-state-channels-panel__tiles">
      <div class="dashboard-state-channels-panel__tile">
        <div class="dashboard-state-channels-panel__tile-label">
          Active Channels
        </div>
        <div class="dashboard-state-channels-panel__tile-value">
          {{ formatNullable(formatNumber(openChannelsCount)) }}
        </div>
      </div>
      <div class="dashboard-state-channels-panel__tile">
        <div class="dashboard-state-channels-panel__tile-label">
          Total Locked
        </div>
        <div class="dashboard-state-channels-panel__tile-value">
          <price-label
            :price="stateChannelsLockedValue"
            :max-digits="2"
            compact/>
        </div>
      </div>
    </div>

    <template v-if="!!stateChannels?.length">
      <dashboard-state-channels-table class="u-hidden-mobile"/>
      <dashboard-state-channels-swiper class="u-hidden-desktop"/>
    </template>
    <blank-state v-else/>
  </app-panel>
</template>

<script setup>
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'

const { stateChannels } = storeToRefs(useDashboardStateChannelsStore())
const { stateChannelsLockedValue, stateChannelsCount: openChannelsCount } = storeToRefs(useBlockchainStatsStore())
</script>

<style scoped>
.dashboard-state-channels-panel {
  width: 100%;
  padding: var(--space-3) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
  }

  &__description {
    max-width: 760px;
    margin: 0 0 var(--space-3);
    font-size: 12.5px;
    line-height: 20px;
    color: var(--text-dim);
  }

  &__tiles {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: var(--space-3);

    @media (--desktop) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__tile {
    padding: 14px 16px;
    background: var(--bg-elev2);
    border: 1px solid var(--border);
    border-radius: var(--r-tile);
  }

  &__tile-label {
    margin-bottom: 7px;
    font-size: 11.5px;
    color: var(--text-faint);
  }

  &__tile-value {
    font-family: var(--font-monospaced);
    font-size: 19px;
    font-weight: 600;
  }
}
</style>
