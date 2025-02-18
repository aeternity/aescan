<template>
  <Head>
    <Title>Mining</Title>
  </Head>
  <page-header>
    Mining Pools
    <template #tooltip>
      {{ miningHints.mining }}
    </template>
  </page-header>
  <template v-if="!isLoading">
    <miners-statistics/>
    <app-tabs v-model="activeTabIndex">
      <app-tab title="Mining Pools">
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

const route = useRoute()
const { push, replace } = useRouter()

const TAB_KEYS = ['mining-pools', 'miners', 'latest-keyblocks']

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
