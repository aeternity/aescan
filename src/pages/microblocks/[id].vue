<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Microblock</Title>
  </Head>

  <page-header>
    Microblock

    <template v-if="!microblockFound">
      not found
    </template>

    <template #tooltip>
      {{ microblocksHints.microblock }}
    </template>
  </page-header>
  <template v-if="!isLoading && microblockFound">
    <microblock-details-panel
      v-if="microblockDetails"
      :microblock-details="microblockDetails"/>

    <microblock-transactions-panel/>
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
import MicroblockTransactionsPanel from '~/components/MicroblockTransactionsPanel'

const { isLoading } = useLoading()
const microblockDetailsStore = useMicroblockDetailsStore()
const { microblockDetails } = storeToRefs(microblockDetailsStore)
const { fetchMicroblock } = microblockDetailsStore
const route = useRoute()

const microblockFound = ref(true)

const { error } = await useAsyncData(async() => {
  await fetchMicroblock(route.params.id)
  return true
})

if (error.value) {
  microblockFound.value = false
  setResponseStatus(404, 'Microblock not found')
}
</script>
