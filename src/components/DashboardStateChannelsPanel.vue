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
    <dashboard-state-channels-table class="u-hidden-mobile"/>
    <dashboard-state-channels-swiper class="u-hidden-desktop"/>
  </app-panel>
</template>
<script setup>
import AppPanel from '@/components/AppPanel'
import DashboardStateChannelsSwiper from '@/components/DashboardStateChannelsSwiper'
import DashboardStateChannelsTable from '@/components/DashboardStateChannelsTable'
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'
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
