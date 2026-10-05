<template>
  <div class="dashboard">
    <div class="dashboard__row dashboard__hero-row">
      <app-hero/>
    </div>

    <div class="dashboard__container">
      <div class="dashboard__row">
        <client-only>
          <dashboard-keyblock-panel/>
        </client-only>
      </div>

      <div class="dashboard__row">
        <div class="dashboard__column">
          <dashboard-names-panel/>
        </div>
      </div>

      <div class="dashboard__row">
        <div class="dashboard__column">
          <dashboard-state-channels-panel/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { fetchSelectedMicroblocksInfo, fetchDeltaStats } = useRecentBlocksStore()
const { fetchTotalStats, fetchMaxTps, fetchTotalTransactionsCount } = useBlockchainStatsStore()

const { fetchStateChannels } = useDashboardStateChannelsStore()

const { fetchInAuctionNames, fetchRecentlyActivatedNames } = useNamesStore()

const { isSubscribedToKeyblockDetails } = storeToRefs(useWebSocket())

definePageMeta({
  layout: 'empty',
})

const isLoading = ref(true)

await useAsyncData(
  'dashboard-static',
  () => Promise.all([
    fetchStateChannels(),
    fetchInAuctionNames(),
    fetchRecentlyActivatedNames(),
    fetchTotalStats(),
    fetchMaxTps(),
  ]),
)

// fetch client-side only due to very dynamic nature of the data and limit difference depending on desktop/mobile view
// use onMounted instead of useAsyncData to ensure re-fetch on every navigation (useAsyncData caches results)
onMounted(async () => {
  await Promise.all([
    fetchSelectedMicroblocksInfo(),
    fetchTotalTransactionsCount(),
    fetchDeltaStats(),
  ])
  isLoading.value = false
})

onBeforeMount(() => {
  isSubscribedToKeyblockDetails.value = true
})
onBeforeUnmount(() => {
  isSubscribedToKeyblockDetails.value = false
})
</script>

<style scoped>
.dashboard {
  &__container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: var(--space-3) var(--space-1) var(--space-3) var(--space-1);

    @media (--desktop) {
      padding: 0 var(--space-4);
      margin-bottom: 80px;
    }
  }

  &__row {
    display: flex;
    flex-direction: column;
    gap: var(--space-3) var(--space-6);
    margin-bottom: var(--space-4);

    @media (--desktop) {
      flex-direction: row;
      margin-bottom: var(--space-6);
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  /* Hero wrapper row: much smaller gap to the keyblocks section below */
  &__hero-row {
    @media (--desktop) {
      margin-bottom: var(--space-2);
    }
  }

  &__column {
    flex: 1 1 0;
  }

  &__loader-panel {
    width: 100%;
  }
}
</style>
