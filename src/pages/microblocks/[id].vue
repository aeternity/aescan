<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Microblock</Title>
  </Head>

  <page-header>
    Microblock
    <template #tooltip>
      {{ microblocksHints.microblock }}
    </template>
  </page-header>
  <template v-if="!isLoading">
    <microblock-details-panel
      v-if="microblockDetails"
      class="microblock-details-panel"
      :microblock-details="microblockDetails"/>
    <app-tabs>
      <app-tab title="Transactions">
        <microblock-transactions-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'nuxt/app'

import { microblocksHints } from '@/utils/hints/microblocksHints'
import { useMicroblockDetailsStore } from '@/stores/microblockDetails'
import PageHeader from '@/components/PageHeader'
import MicroblockDetailsPanel from '@/components/MicroblockDetailsPanel'
import MicroblockTransactionsPanel from '~/components/MicroblockTransactionsPanel'
import AppTabs from '~/components/AppTabs'
import AppTab from '~/components/AppTab'
import KeyblockMicroblocksPanel from '~/components/KeyblockMicroblocksPanel'

const microblockDetailsStore = useMicroblockDetailsStore()
const { microblockDetails } = storeToRefs(microblockDetailsStore)
const { fetchMicroblock } = microblockDetailsStore
const route = useRoute()

const { isLoading } = useLoading()

await useAsyncData(async() => {
  await fetchMicroblock(route.params.id)
  return true
})
</script>
<style scoped>
.microblock-details-panel {
  margin-bottom: var(--space-4);
  @media (--desktop) {
    margin-bottom: var(--space-6);
  }
}
</style>
