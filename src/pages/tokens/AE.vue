<template>
  <Head>
    <Title>AE Coin</Title>
  </Head>

  <page-header>
    AE Coin
    <template #tooltip>
      {{ aeCoinHints.aeCoin }}
    </template>
  </page-header>

  <template v-if="!isLoading">
    <ae-coin-panel
      class="ae-coin__panel"
      :price="price"
      :price-change="priceChange"
      :total-token-supply="totalTokenSupply"/>

    <app-tabs v-model="activeTabIndex">
      <app-tab title="Transactions">
        <ae-coin-transactions-panel/>
      </app-tab>
      <app-tab title="Markets">
        <ae-coin-markets-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { aeCoinHints } from '@/utils/hints/aeCoinHints'
import { useMarketStatsStore } from '@/stores/marketStats'
import { useBlockchainStatsStore } from '@/stores/blockchainStats'

const route = useRoute()
const { push, replace } = useRouter()

const { price, priceChange } = storeToRefs(useMarketStatsStore())
const { fetchMarketStats } = useMarketStatsStore()

const { totalTokenSupply } = storeToRefs(useBlockchainStatsStore())
const { fetchTotalStats } = useBlockchainStatsStore()

const { isLoading } = useLoading()
const TAB_KEYS = ['transactions', 'markets']

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

await useAsyncData(() => Promise.allSettled([
  fetchTotalStats(),
  fetchMarketStats(),
]))
</script>

<style scoped>
.ae-coin__panel {
  margin-bottom: var(--space-4);

  @media (--desktop) {
    margin-bottom: var(--space-6);
  }
}
</style>
