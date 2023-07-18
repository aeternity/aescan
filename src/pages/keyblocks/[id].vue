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

  <keyblock-microblocks-panel
    v-if="keyblockDetails"
    :microblocks="keyblockMicroblocks"/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'nuxt/app'
import { useKeyblockDetailsStore } from '@/stores/keyblockDetailsStore'
import PageHeader from '@/components/PageHeader'
import KeyblockDetailsPanel from '@/components/KeyblockDetailsPanel'
import KeyblockMicroblocksPanel from '~/pages/keyblocks/KeyblockMicroblocksPanel'

const keyblockDetailsStore = useKeyblockDetailsStore()
const { keyblockDetails, keyblockMicroblocks } = storeToRefs(keyblockDetailsStore)
const { fetchKeyblock, fetchKeyblockMicroblocks } = keyblockDetailsStore
const route = useRoute()

await useAsyncData(async() => {
  await fetchKeyblock(route.params.id)
  await fetchKeyblockMicroblocks(route.params.id)
  // todo jinak
  return true
})
</script>
