<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Names</Title>
  </Head>

  <page-header>
    Names

    <template #tooltip>
      {{ namesHints.name }}
      <app-link
        variant="primary"
        to="https://docs.aeternity.com/protocol/AENS/">
        Learn more
      </app-link>
    </template>
  </page-header>
  <template v-if="!isLoading">
    <app-tabs
      v-model="activeTabIndex"
      class="names__tabs">
      <app-tab title="Active">
        <names-active-panel/>
      </app-tab>
      <app-tab title="In Auction">
        <names-in-auction-panel/>
      </app-tab>
      <app-tab title="Expired">
        <names-expired-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { useRoute, useRouter } from 'nuxt/app'
import AppTab from '@/components/AppTab'
import AppTabs from '@/components/AppTabs'
import NamesActivePanel from '@/components/NamesActivePanel'
import NamesInAuctionPanel from '@/components/NamesInAuctionPanel'
import NamesExpiredPanel from '@/components/NamesExpiredPanel'
import { useNamesStore } from '@/stores/names'
import PageHeader from '@/components/PageHeader'
import { namesHints } from '@/utils/hints/namesHints'
import { isDesktop } from '@/utils/screen'

const TAB_KEYS = ['active', 'in-auction', 'expired']

const { fetchNamesDetails } = useNamesStore()
const { push, replace } = useRouter()
const route = useRoute()

const activeTabIndex = computed({
  get() {
    const { type: activeTabName } = route.query

    if (activeTabName === undefined) {
      return 0
    }

    return TAB_KEYS.indexOf(activeTabName)
  },
  set(index) {
    const newRoute = {
      query: {
        type: TAB_KEYS[index],
      },
    }

    if (activeTabIndex.value === index) {
      // if navigating back
      return replace(newRoute)
    }

    return push(newRoute)
  },
})

const nuxtApp = useNuxtApp()
const isLoading = ref(true)
nuxtApp.hook('page:start', () => {
  isLoading.value = true
})
nuxtApp.hook('page:finish', () => {
  isLoading.value = false
})

if (process.client) {
  const limit = isDesktop() ? null : 3
  fetchNamesDetails({ limit })
}
</script>

<style scoped>
.names {
  &__tabs {
    padding-top: var(--space-4);
    @media (--desktop) {
      padding-top: 0;
    }
  }
}
</style>
