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
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'nuxt/app'
import { keyblocksHints } from '@/utils/hints/keyblocksHints'
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
