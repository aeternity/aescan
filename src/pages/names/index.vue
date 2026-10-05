<template>
  <Head>
    <Title>Names</Title>
  </Head>

  <page-shell title="Names">
    <template #tooltip>
      {{ namesHints.name }}
      <app-link
        variant="primary"
        to="https://docs.aeternity.com/protocol/AENS/">
        Learn more
      </app-link>
    </template>
    <template #subtitle>
      Protocol-level <strong class="names__highlight">.chain</strong> names via the æternity naming system (AENS)
      &mdash; obtained instantly, or via auction when shorter than 13 characters.
    </template>

    <template v-if="!isLoading">
      <page-overview>
        <template #tiles>
          <overview-tile label="Active Names">
            {{ formatNullable(formatNumber(activeNamesCount)) }}
          </overview-tile>
          <overview-tile label="Names In Auction">
            {{ formatNullable(formatNumber(namesInAuctionCount)) }}
          </overview-tile>
        </template>
        <names-chart-panel
          title="Names Activated"
          :height="170"
          :scope="CHART_SCOPE_PRESETS_OPTIONS[0]"/>
      </page-overview>

      <list-card>
        <template #title>
          Names
        </template>
        <template #controls>
          <app-segmented-control
            v-model="activeTab"
            :options="tabOptions"/>
        </template>
        <names-active-panel v-if="activeTab === 'active'"/>
        <names-in-auction-panel v-else-if="activeTab === 'in-auction'"/>
        <names-expired-panel v-else/>
      </list-card>
    </template>
    <loader-panel v-else/>
  </page-shell>
</template>

<script setup>
import { namesHints } from '@/utils/hints/namesHints'

definePageMeta({
  layout: 'empty',
})

const tabOptions = [
  { value: 'active', label: 'Active' },
  { value: 'in-auction', label: 'In Auction' },
  { value: 'expired', label: 'Expired' },
]

const { fetchNames } = useNamesStore()
const { fetchTotalStats } = useBlockchainStatsStore()
const { activeNamesCount, namesInAuctionCount } = storeToRefs(useBlockchainStatsStore())

const { push, replace } = useRouter()
const route = useRoute()

const activeTab = computed({
  get() {
    const { type } = route.query

    return tabOptions.some(option => option.value === type) ? type : 'active'
  },
  set(tab) {
    const newRoute = {
      query: {
        type: tab,
      },
    }

    if (activeTab.value === tab) {
      // if navigating back
      return replace(newRoute)
    }

    return push(newRoute)
  },
})

const { isLoading } = useLoading()

if (import.meta.client) {
  fetchNames()
  fetchTotalStats()
}
</script>

<style scoped>
.names__highlight {
  font-weight: 600;
  color: var(--text);
}
</style>
