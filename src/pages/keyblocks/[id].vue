<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Keyblock </Title>
  </Head>

  <page-header>
    Keyblock
    <template #tooltip>
      {{ keyblocksHints.keyblock }}
    </template>
  </page-header>

  <keyblock-details-panel
    v-if="keyblockDetails"
    :keyblock-details="keyblockDetails"/>

  <app-tabs v-if="showTabs">
    <app-tab title="Microblocks">
      <keyblock-microblocks-panel/>
    </app-tab>
  </app-tabs>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'nuxt/app'
import { keyblocksHints } from '@/utils/hints/keyblocksHints'
import { useKeyblockDetailsStore } from '@/stores/keyblockDetails'
import PageHeader from '@/components/PageHeader'
import KeyblockDetailsPanel from '@/components/KeyblockDetailsPanel'
import KeyblockMicroblocksPanel from '@/components/KeyblockMicroblocksPanel'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'

const keyblockDetailsStore = useKeyblockDetailsStore()
const { keyblockDetails } = storeToRefs(keyblockDetailsStore)
const { fetchKeyblock } = keyblockDetailsStore
const route = useRoute()

const showTabs = computed(() => keyblockDetails.value && !keyblockDetails.value?.notExistent)

await useAsyncData(async() => {
  await fetchKeyblock(route.params.id)
  return true
})
</script>
