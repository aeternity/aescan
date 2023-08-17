<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Microblock</Title>
  </Head>

  <page-header>
    Microblock

    <template v-if="!isMicroblockFound">
      not found
    </template>

    <template #tooltip>
      {{ microblocksHints.microblock }}
    </template>
  </page-header>
  <template v-if="!isLoading && isMicroblockFound">
    <microblock-details-panel
      v-if="microblockDetails"
      class="microblock-details__microblock-details-panel"
      :microblock-details="microblockDetails"/>
    <app-tabs>
      <app-tab title="Transactions">
        <microblock-transactions-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else-if="isLoading"/>
  <not-found-panel v-else>
    Oops! We are sorry. The microblock identified by
    <q>
      {{ route.params.id }}
    </q>
    was not found.
  </not-found-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'nuxt/app'

import { microblocksHints } from '@/utils/hints/microblocksHints'
import { useMicroblockDetailsStore } from '@/stores/microblockDetails'
import PageHeader from '@/components/PageHeader'
import NotFoundPanel from '@/components/NotFoundPanel'
import MicroblockDetailsPanel from '@/components/MicroblockDetailsPanel'
import MicroblockTransactionsPanel from '@/components/MicroblockTransactionsPanel'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'

const { isLoading } = useLoading()
const microblockDetailsStore = useMicroblockDetailsStore()
const { microblockDetails } = storeToRefs(microblockDetailsStore)
const { fetchMicroblock } = microblockDetailsStore
const route = useRoute()

const isMicroblockFound = ref(true)

const { error } = await useAsyncData(async() => {
  await fetchMicroblock(route.params.id)
  return true
})

if (error.value) {
  isMicroblockFound.value = false
  setResponseStatus(404, 'Microblock not found')
}
</script>
<style scoped>
.microblock-details__microblock-details-panel {
  margin-bottom: var(--space-4);
  @media (--desktop) {
    margin-bottom: var(--space-6);
  }
}
</style>
