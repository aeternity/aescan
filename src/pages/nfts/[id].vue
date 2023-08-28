<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | NFT</Title>
  </Head>

  <page-header>
    NFT
    <template #tooltip>
      {{ nftsHints.nft }}
    </template>
  </page-header>
  <template v-if="!isLoading">
    <nft-details-panel
      v-if="nftDetails"
      :nft-details="nftDetails"/>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { nftsHints } from '@/utils/hints/nftHints'
import PageHeader from '@/components/PageHeader'
import { useNftDetailsStore } from '@/stores/nftDetails'
import NftDetailsPanel from '@/components/NftDetailsPanel'

const nftDetailsStore = useNftDetailsStore()
const { nftDetails } = storeToRefs(nftDetailsStore)
const { fetchNftDetails } = nftDetailsStore
const route = useRoute()

const { isLoading } = useLoading()

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
