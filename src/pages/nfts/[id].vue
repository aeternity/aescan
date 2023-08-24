<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | NFT</Title>
  </Head>

  <page-header>
    NFT

    <template #tooltip>
      <!--      {{ oraclesHints.oracle }}-->
    </template>
  </page-header>

  <nft-details-panel
    v-if="!isLoading"
    :nft-details="nft"/>
  <loader-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import PageHeader from '@/components/PageHeader'
import { useNftDetailsStore } from '@/stores/nftDetails'
import NftDetailsPanel from '~/components/NftDetailsPanel'

const nftDetailsStore = useNftDetailsStore()
const { nft } = storeToRefs(nftDetailsStore)
const { fetchNft } = nftDetailsStore
const route = useRoute()
const { isLoading } = useLoading()

const { error } = await useAsyncData(() => fetchNft(route.params.id))

if (error.value) {
  throw showError({
    data: {
      entityId: route.params.id,
      entityName: 'NFT',
    },
    statusMessage: 'EntityDetailsNotFound',
  })
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
