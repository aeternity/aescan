<template>
  <Head>
    <Title>Search Results</Title>
  </Head>
  <page-header>
    Search Results
  </page-header>

  <template v-if="!isLoading">
    <app-tabs v-model="activeTabIndex">
      <app-tab title="Names">
        <search-names-panel/>
      </app-tab>
      <app-tab title="Tokens">
        <search-tokens-panel/>
      </app-tab>
      <app-tab title="NFTs">
        <search-nft-panel/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import PageHeader from '@/components/PageHeader'
import AppTabs from '@/components/AppTabs'
import AppTab from '@/components/AppTab'
import SearchNftPanel from '@/components/SearchNftsPanel'

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
