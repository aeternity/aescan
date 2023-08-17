<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Keyblock </Title>
  </Head>

  <page-header>
    Keyblock

    <template v-if="!isKeyblockFound">
      not found
    </template>

    <template #tooltip>
      {{ keyblocksHints.keyblock }}
    </template>
  </page-header>

  <template v-if="!isLoading && isKeyblockFound">
    <keyblock-details-panel
      v-if="keyblockDetails"
      class="keyblock-details__keyblock-details-panel"
      :keyblock-details="keyblockDetails"/>

    <app-tabs v-if="isKeyblockExistent">
      <app-tab title="Microblocks">
        <keyblock-microblocks-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else-if="isLoading"/>
  <not-found-panel v-else>
    Oops! We are sorry. The keyblock identified by
    <q>
      {{ route.params.id }}
    </q>
    was not found.
  </not-found-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'nuxt/app'
import { keyblocksHints } from '@/utils/hints/keyblocksHints'
import { useKeyblockDetailsStore } from '@/stores/keyblockDetails'
import PageHeader from '@/components/PageHeader'
import NotFoundPanel from '@/components/NotFoundPanel'
import KeyblockDetailsPanel from '@/components/KeyblockDetailsPanel'
import KeyblockMicroblocksPanel from '@/components/KeyblockMicroblocksPanel'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'

const keyblockDetailsStore = useKeyblockDetailsStore()
const { keyblockDetails } = storeToRefs(keyblockDetailsStore)
const { fetchKeyblock } = keyblockDetailsStore
const route = useRoute()

const { isLoading } = useLoading()

const isKeyblockExistent = computed(() => keyblockDetails.value && !keyblockDetails.value.notExistent)
const isKeyblockFound = ref(true)

const { error } = await useAsyncData(async() => {
  await fetchKeyblock(route.params.id)
  return true
})

if (error.value) {
  isKeyblockFound.value = false
  setResponseStatus(404, 'Keyblock not found')
}
</script>

<style scoped>
.keyblock-details__keyblock-details-panel {
  margin-bottom: var(--space-4);
  @media (--desktop) {
    margin-bottom: var(--space-6);
  }
}
</style>
