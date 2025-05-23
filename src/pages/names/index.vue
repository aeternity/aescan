<template>
  <Head>
    <Title>Names</Title>
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
    <names-chart-panel
      class="names__names-panel"
      :scope="CHART_SCOPE_PRESETS_OPTIONS[0]"/>
    <app-tabs v-model="activeTabIndex">
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
import { namesHints } from '@/utils/hints/namesHints'

const TAB_KEYS = ['active', 'in-auction', 'expired']

const { fetchNames } = useNamesStore()

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

const { isLoading } = useLoading()

if (import.meta.client) {
  fetchNames()
}
</script>

<style scoped>
.names__names-panel {
  margin-bottom: var(--space-4);

  @media (--desktop) {
    margin-bottom: var(--space-6);
  }
}
</style>
