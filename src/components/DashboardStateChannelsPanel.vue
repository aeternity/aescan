<template>
  <app-panel class="dashboard-state-channels-panel">
    <dashboard-panel-header
      level="h3"
      title="LATEST ACTIVE STATE CHANNELS"
      icon-name="state-channel"
      show-all-link="/state-channels">
      <template #tooltip>
        {{ stateChannelsHints.stateChannel }}
      </template>
    </dashboard-panel-header>
    <template v-if="!!stateChannels.length">
      <dashboard-state-channels-table class="u-hidden-mobile"/>
      <dashboard-state-channels-swiper class="u-hidden-desktop"/>
    </template>
    <blank-state v-else/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'

const { stateChannels } = storeToRefs(useDashboardStateChannelsStore())
</script>

<style scoped>
.dashboard-state-channels-panel {
  width: 100%;
  padding: var(--space-3) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
  }
}
</style>
