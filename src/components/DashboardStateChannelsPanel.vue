<template>
  <app-panel class="dashboard-state-channels-panel">
    <panel-header
      level="h3"
      title="STATE CHANNELS"
      icon-name="state-channel"
      show-all-link="/state-channels">
      <template #tooltip>
        Numbers are counting on-chain transactions only. There can be millions of transactions executed
        off-chain in
        <app-link
          variant="primary"
          to="https://aeternity.com/state-channels">
          State Channels
        </app-link>
        .
      </template>
    </panel-header>
    <dashboard-state-channels-table class="dashboard-state-channels-panel__table"/>
    <dashboard-state-channels-swiper class="dashboard-state-channels-panel__swiper"/>
  </app-panel>
</template>
<script setup>
import AppPanel from '@/components/AppPanel'
import AppLink from '@/components/AppLink'
import PanelHeader from '@/components/PanelHeader'
import DashboardStateChannelsSwiper from '@/components/DashboardStateChannelsSwiper'
import DashboardStateChannelsTable from '@/components/DashboardStateChannelsTable'
</script>

<style scoped>
.dashboard-state-channels-panel {
  width: 100%;
  padding: var(--space-4) var(--space-1);
  @media (--desktop) {
    padding: var(--space-4) var(--space-4) var(--space-3);
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
