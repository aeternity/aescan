<template>
  <Head>
    <Title>Mining</Title>
  </Head>

  <page-header>
    Mining
    <template #tooltip>
      {{ miningHints.mining }}
    </template>
  </page-header>

  <template v-if="!isLoading">
    <mining-statistics-grid/>
    <app-tabs v-model="activeTabIndex">
      <app-tab
        v-if="NETWORK_NAME !== 'TESTNET'"
        title="Mining Pools">
        <mining-pools-panel/>
      </app-tab>
      <app-tab title="Miners">
        <miners-panel/>
      </app-tab>
      <app-tab title="Latest Keyblocks">
        <keyblocks-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { miningHints } from '@/utils/hints/miningHints'
import MiningStatisticsGrid from '~/components/MiningStatisticsGrid.vue'

const route = useRoute()
const { push, replace } = useRouter()

const { NETWORK_NAME } = useRuntimeConfig().public
const TAB_KEYS = NETWORK_NAME !== 'TESTNET'
  ? ['mining-pools', 'miners', 'latest-keyblocks']
  : ['miners', 'latest-keyblocks']

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
</script>
