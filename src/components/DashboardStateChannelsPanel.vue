<template>
  <app-panel class="dashboard-state-channels-panel">
    <panel-header
      level="h3"
      title="STATE CHANNELS"
      icon-name="state-channel">
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
    <state-channels-swiper class="dashboard-state-channels-panel__swiper"/>
  </app-panel>
</template>
<script>
import AppPanel from '@/components/AppPanel'
import AppLink from '@/components/AppLink'
import PanelHeader from '@/components/PanelHeader'
import StateChannelsSwiper from '~/components/DashboardStateChannelsSwiper'
import StateChannelsTable from '~/components/DashboardStateChannelsTable'
import DashboardStateChannelsTable from '~/components/DashboardStateChannelsTable'

export default {
  name: 'DashboardStateChannelsPanel',
  components: { DashboardStateChannelsTable, StateChannelsTable, StateChannelsSwiper, PanelHeader, AppPanel, AppLink },
}
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
