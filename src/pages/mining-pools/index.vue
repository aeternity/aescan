<template>
  <Head>
    <Title>Mining Pools</Title>
  </Head>
  <page-header>
    Mining Pools
    <template #tooltip>
      <!--      todo hints-->
      {{ topAccountsHints.topAccounts }}
    </template>
  </page-header>
  <tempalte v-if="!isLoading">
    <miners-statistics/>
    <app-tabs v-model="activeTabIndex">
      <app-tab title="Mining Pools">
      <!--        todo naming-->
        <miners-panel/>

      </app-tab>
      <app-tab title="Miners">
      <!--        todo naming-->
        <mining-pools-miners-panel/>
      </app-tab>
      <app-tab title="Latest Blocks">
        <keyblocks-panel/>
      </app-tab>
    </app-tabs>
  </tempalte>
  <loader-panel v-else/>
</template>

<script setup>
import PageHeader from '~/components/PageHeader.vue'
import { topAccountsHints } from '~/utils/hints/topAccountsHints'
import AppTab from '~/components/AppTab.vue'
import AppTabs from '~/components/AppTabs.vue'

const route = useRoute()
const { push, replace } = useRouter()

const TAB_KEYS = ['names', 'tokens', 'nfts']

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
