<template>
  <Head>
    <Title>AE Coin</Title>
  </Head>

  <page-header>
    AE Coin
    <template #tooltip>
      {{ aeCoinHints.aeCoin }}
    </template>

    <template #end>
      <app-dropdown class="ae-coin__dropdown">
        <app-button class="ae-coin__button">
          Trade
        </app-button>
        <template #menu>
          <markets-list/>
        </template>
      </app-dropdown>
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
      <app-tab title="Trading Pairs">
        <ae-coin-trading-pairs-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { aeCoinHints } from '@/utils/hints/aeCoinHints'

const { price, priceChange } = storeToRefs(useMarketStatsStore())
const { fetchMarketStats } = useMarketStatsStore()

const { totalTokenSupply } = storeToRefs(useBlockchainStatsStore())
const { fetchTotalStats } = useBlockchainStatsStore()

const TAB_KEYS = ['transactions', 'markets', 'trading-pairs']

const route = useRoute()
const { push, replace } = useRouter()

const { isLoading } = useLoading()

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
.ae-coin {
  &__panel {
    margin-bottom: var(--space-4);

    @media (--desktop) {
      margin-bottom: var(--space-6);
    }
  }

  &__button {
    height: 32px;
    margin-left: var(--space-1);
  }

  &__dropdown {
    display: flex;
    align-items: center;
    margin-bottom: var(--space-5);

    @media (--desktop) {
      margin-bottom: 0;
    }
  }
}
</style>
