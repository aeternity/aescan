<template>
  <app-panel v-if="nftTransfers">
    <paginated-content
      :entities="nftTransfers"
      pagination-style="history"
      :limit="10"
      @prev-clicked="loadPrevNftTransfers"
      @next-clicked="loadNextNftTransfers">
      <nfts-transfers-table
        class="nfts-transfers-panel__table"
        :nft-transfers="nftTransfers"/>
      <nfts-transfers-table-condensed
        class="nfts-transfers-panel__table-condensed"
        :nft-transfers="nftTransfers"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNftDetailsStore } from '@/stores/nftDetails'

const nftDetailsStore = useNftDetailsStore()
const { nftTransfers } = storeToRefs(nftDetailsStore)
const { fetchNftTransfers } = nftDetailsStore

async function loadPrevNftTransfers() {
  await fetchNftTransfers({ queryParameters: nftTransfers.value.prev })
}

async function loadNextNftTransfers() {
  await fetchNftTransfers({ queryParameters: nftTransfers.value.next })
}
</script>

<style scoped>
.nfts-transfers-panel {
  &__table {
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
