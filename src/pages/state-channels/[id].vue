<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | State Channel</Title>
  </Head>

  <page-header>
    State Channel

    <template #tooltip>
      {{ stateChannelsHints.stateChannel }}
      <app-link
        variant="primary"
        to="https://aeternity.com/state-channels">
        Learn more
      </app-link>
    </template>
  </page-header>

  <state-channel-details-panel
    class="state-channel-details__panel"
    :state-channel-details="stateChannelDetails"/>

  <app-tabs v-if="stateChannelDetails">
    <app-tab title="Transactions">
      <state-channel-transactions-panel/>
    </app-tab>
  </app-tabs>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import StateChannelDetailsPanel from '@/components/StateChannelDetailsPanel'
import PageHeader from '@/components/PageHeader'
import { useStateChannelDetailsStore } from '@/stores/stateChannelDetails'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'
import StateChannelTransactionsPanel from '@/components/StateChannelTransactionsPanel'

const stateChannelDetailsStore = useStateChannelDetailsStore()
const { stateChannelDetails } = storeToRefs(stateChannelDetailsStore)
const { fetchStateChannelDetails } = stateChannelDetailsStore
const route = useRoute()

await useAsyncData(() => fetchStateChannelDetails(route.params.id))
</script>

<style scoped>
.state-channel-details {
  &__panel {
    margin-bottom: var(--space-4);
  }
}
</style>
