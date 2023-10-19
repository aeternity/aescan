<template>
  <app-panel>
    <paginated-content
      :entities="nftTransfers"
      pagination-style="history"
      :limit="10"
      @prev-clicked="loadPrevNftTransfers"
      @next-clicked="loadNextNftTransfers">
      <nft-transfers-table
        class="u-hidden-mobile"
        :nft-transfers="nftTransfers"/>

      <nft-transfers-table-condensed
        class="u-hidden-desktop"
        :nft-transfers="nftTransfers"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useNftDetailsStore } from '@/stores/nftDetails'
import PaginatedContent from '@/components/PaginatedContent'
import { isDesktop } from '@/utils/screen'

const route = useRoute()
const limit = computed(() => process.client && isDesktop() ? 10 : 3)

const nftDetailsStore = useNftDetailsStore()
const { nftTransfers } = storeToRefs(nftDetailsStore)
const { fetchNftTransfers } = nftDetailsStore

async function loadPrevNftTransfers() {
  await fetchNftTransfers({ queryParameters: nftTransfers.value.prev })
}

async function loadNextNftTransfers() {
  await fetchNftTransfers({ queryParameters: nftTransfers.value.next })
}

if (process.client) {
  await fetchNftTransfers({
    limit: limit.value,
    contractId: route.params.id,
  })
}
</script>
