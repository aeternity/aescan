<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | State Channel</Title>
  </Head>

  <page-header>
    State Channel
  </page-header>

  <state-channel-details-panel
    v-if="stateChannelDetails"
    class="state-channel-details__panel"
    :state-channel-details="stateChannelDetails"/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import StateChannelDetailsPanel from '@/components/StateChannelDetailsPanel'
import PageHeader from '@/components/PageHeader'
import { useStateChannelDetailsStore } from '@/stores/stateChannelDetails'

const stateChannelDetailsStore = useStateChannelDetailsStore()
const { stateChannelDetails } = storeToRefs(stateChannelDetailsStore)
const { fetchStateChannelDetails } = stateChannelDetailsStore
const route = useRoute()

await useAsyncData(() => fetchStateChannelDetails(route.params.id))
</script>

<style scoped>
.state-channel-details {
  &__panel {
    margin-bottom: var(--space-6);
  }
}
</style>
