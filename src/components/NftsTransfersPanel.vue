<template>
  <app-panel>
    <paginated-content
      :entities="nftTransfers"
      pagination-style="history"
      :limit="limit"
      @prev-clicked="loadPrevNftTransfers"
      @next-clicked="loadNextNftTransfers">
      <nfts-transfers-table
        class="u-hidden-mobile"
        :nft-transfers="nftTransfers"/>
      <nfts-transfers-table-condensed
        class="u-hidden-desktop"
        :nft-transfers="nftTransfers"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNftDetailsStore } from '@/stores/nftDetails'
import { isDesktop } from '@/utils/screen'

const nftDetailsStore = useNftDetailsStore()
const { nftTransfers } = storeToRefs(nftDetailsStore)
const { fetchNftTransfers } = nftDetailsStore

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

async function loadPrevNftTransfers() {
  await fetchNftTransfers({ queryParameters: nftTransfers.value.prev })
}

async function loadNextNftTransfers() {
  await fetchNftTransfers({ queryParameters: nftTransfers.value.next })
}
</script>
