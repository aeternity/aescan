<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | State Channel</Title>
  </Head>

  <page-header>
    State Channel

    <template v-if="!channelFound">
      not found
    </template>

    <template #tooltip>
      {{ stateChannelsHints.stateChannel }}
      <app-link
        variant="primary"
        to="https://aeternity.com/state-channels">
        Learn more
      </app-link>
    </template>
  </page-header>

  <template v-if="!isLoading && channelFound">
    <state-channel-details-panel
      class="state-channel-details__panel"
      :state-channel-details="stateChannelDetails"/>

    <app-tabs v-if="stateChannelDetails">
      <app-tab title="Transactions">
        <state-channel-transactions-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else-if="isLoading"/>
  <not-found-panel v-else>
    Oops! We are sorry. The state channel identified by
    <q>
      {{ route.params.id }}
    </q>
    was not found.
  </not-found-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import StateChannelDetailsPanel from '@/components/StateChannelDetailsPanel'
import PageHeader from '@/components/PageHeader'
import NotFoundPanel from '@/components/NotFoundPanel'
import { useStateChannelDetailsStore } from '@/stores/stateChannelDetails'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'
import { stateChannelsHints } from '@/utils/hints/stateChannelsHints'
import StateChannelTransactionsPanel from '@/components/StateChannelTransactionsPanel'

const stateChannelDetailsStore = useStateChannelDetailsStore()
const { stateChannelDetails } = storeToRefs(stateChannelDetailsStore)
const { fetchStateChannelDetails } = stateChannelDetailsStore
const route = useRoute()

const { isLoading } = useLoading()

const channelFound = ref(true)

const { error } = await useAsyncData(() => fetchStateChannelDetails(route.params.id))

if (error.value) {
  channelFound.value = false
  setResponseStatus(404, 'State Channel not found')
}
</script>

<style scoped>
.state-channel-details {
  &__panel {
    margin-bottom: var(--space-6);
  }
}
</style>
