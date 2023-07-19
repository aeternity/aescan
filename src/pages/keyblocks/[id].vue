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

  <keyblock-microblocks-panel :microblocks-count="keyblockDetails.micro_blocks_count"/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'nuxt/app'
import { useKeyblockDetailsStore } from '@/stores/keyblockDetailsStore'
import PageHeader from '@/components/PageHeader'
import KeyblockDetailsPanel from '@/components/KeyblockDetailsPanel'
import KeyblockMicroblocksPanel from '~/pages/keyblocks/KeyblockMicroblocksPanel'
import { useKeyblockDetailsStore } from '@/stores/keyblockDetails'
import PageHeader from '@/components/PageHeader'
import KeyblockDetailsPanel from '@/components/KeyblockDetailsPanel'

const keyblockDetailsStore = useKeyblockDetailsStore()
const { keyblockDetails } = storeToRefs(keyblockDetailsStore)
const { fetchKeyblock } = keyblockDetailsStore
const route = useRoute()

await useAsyncData(async() => {
  await fetchKeyblock(route.params.id)
  return true
})
</script>
