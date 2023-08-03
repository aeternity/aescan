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
      :microblock-details="microblockDetails"/>

    <microblock-transactions-panel/>
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
import MicroblockTransactionsPanel from '@/components/MicroblockTransactionsPanel'

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
