<template>
  <Head>
    <Title>NFT</Title>
  </Head>

  <page-header>
    NFT
    <template #tooltip>
      {{ nftsHints.nft }}
    </template>
  </page-header>
  <template v-if="!isLoading">
    <nft-details-panel
      v-if="nft"
      class="nft-details__panel"
      :nft-details="nft"/>
    <app-tabs v-model="activeTabIndex">
      <app-tab title="Transfers">
        <nft-transfers-panel/>
      </app-tab>
      <app-tab title="Inventory">
        <nft-inventory-panel v-if="hasTemplates"/>
        <nft-owners-panel v-else/>
      </app-tab>
    </app-tabs>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { nftsHints } from '@/utils/hints/nftsHints'

const nftDetailsStore = useNftDetailsStore()
const { nft } = storeToRefs(nftDetailsStore)
const { fetchNftDetails } = nftDetailsStore

const route = useRoute()
const { push, replace } = useRouter()

const { isLoading } = useLoading()

const hasTemplates = computed(() => {
  return nft.value?.extensions.includes('mintable_templates_limit')
})

const TAB_KEYS = ['transfers', 'inventory']

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

try {
  await fetchNftDetails(route.params.id)
} catch (error) {
  if ([400, 404].includes(error.response?.status)) {
    throw showError({
      data: {
        entityId: route.params.id,
        entityName: 'NFT',
      },
      statusMessage: 'EntityDetailsNotFound',
    })
  }
}
</script>

<style scoped>
.nft-details__panel {
  margin-bottom: var(--space-4);

  @media (--desktop) {
    margin-bottom: var(--space-6);
  }
}
</style>
