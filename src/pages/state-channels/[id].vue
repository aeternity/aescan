<template>
  <Head>
    <Title>State Channel</Title>
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

  <template v-if="!isLoading">
    <state-channel-details-panel
      v-if="stateChannelDetails"
      class="state-channel-details__state-channel-details-panel"
      :state-channel-details="stateChannelDetails"/>

    <app-tabs>
      <app-tab title="Transactions">
        <state-channel-transactions-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'

const { stateChannelDetails } = storeToRefs(useStateChannelDetailsStore())
const { fetchStateChannelDetails } = useStateChannelDetailsStore()

const route = useRoute()

const { isLoading } = useLoading()

if (import.meta.client) {
  fetchStateChannelDetails(route.params.id)
}
</script>

<style scoped>
.state-channel-details__state-channel-details-panel {
  margin-bottom: var(--space-4);

  @media (--desktop) {
    margin-bottom: var(--space-6);
  }
}
</style>
