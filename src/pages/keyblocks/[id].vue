<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Keyblock </Title>
  </Head>

  <page-header>
    Keyblock
  </page-header>

  <keyblock-details-panel
    v-if="keyblockDetails"
    :keyblock-details="keyblockDetails"/>

  <app-tabs>
    <app-tab title="Microblocks">
      <keyblock-microblocks-panel v-if="keyblockDetails"/>
    </app-tab>
  </app-tabs>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'nuxt/app'
import PageHeader from '@/components/PageHeader'
import KeyblockDetailsPanel from '@/components/KeyblockDetailsPanel'
import KeyblockMicroblocksPanel from '@/components/KeyblockMicroblocksPanel'
import { useKeyblockDetailsStore } from '@/stores/keyblockDetails'
import AppTabs from '~/components/AppTabs'
import AppTab from '~/components/AppTab'

const keyblockDetailsStore = useKeyblockDetailsStore()
const { keyblockDetails } = storeToRefs(keyblockDetailsStore)
const { fetchKeyblock } = keyblockDetailsStore
const route = useRoute()

await useAsyncData(async() => {
  await fetchKeyblock(route.params.id)
  return true
})
</script>
