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
    <app-tabs>
      <app-tab title="Transfers">
        <nfts-transfers-panel/>
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
import { storeToRefs } from 'pinia'
import { nftsHints } from '@/utils/hints/nftHints'
import PageHeader from '@/components/PageHeader'
import { useNftDetailsStore } from '@/stores/nftDetails'
import NftDetailsPanel from '@/components/NftsDetailsPanel'
import NftInventoryPanel from '@/components/NftsInventoryPanel'
import NftOwnersPanel from '@/components/NftsOwnersPanel'

const nftDetailsStore = useNftDetailsStore()
const { nft } = storeToRefs(nftDetailsStore)
const { fetchNftDetails } = nftDetailsStore
const route = useRoute()

const { isLoading } = useLoading()

const hasTemplates = computed(() => {
  return nft.value?.extensions.includes('mintable_templates_limit')
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
  throw error
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
