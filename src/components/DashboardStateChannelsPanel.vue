<template>
  <app-panel
    class="dashboard-state-channels-panel"
    level="h3"
    title="State Channels"
    icon-name="state-channel"
    show-all-link="/state-channels">
    <template #title>
      STATE CHANNELS
    </template>

    <template #tooltip>
      {{ stateChannelsHints.stateChannel }}
    </template>
    <dashboard-state-channels-table class="dashboard-state-channels-panel__table"/>
    <dashboard-state-channels-swiper class="dashboard-state-channels-panel__swiper"/>
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

  &__swiper {
    @media (--desktop) {
      display: none;
    }
  }

  &__table {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }
}
</style>
