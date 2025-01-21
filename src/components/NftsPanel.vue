<template>
  <app-panel>
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="nfts"
      :total-count="nftsCount"
      :limit="limit"
      @prev-clicked="loadPrevNfts"
      @next-clicked="loadNextNfts">
      <nfts-table
        :nfts="nfts"
        class="u-hidden-mobile"/>
      <nfts-table-condensed
        :nfts="nfts"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>

import { isDesktop } from '@/utils/screen'

const limit = computed(() => process.client && isDesktop() ? 10 : 3)
const pageIndex = ref(1)

const nftsStore = useNftsStore()
const {
  nfts,
  nftsCount,
} = storeToRefs(nftsStore)
const { fetchNfts, fetchNftsList } = nftsStore

async function loadPrevNfts() {
  await fetchNftsList({ queryParameters: nfts.value.prev })
}

async function loadNextNfts() {
  await fetchNftsList({ queryParameters: nfts.value.next })
}

if (process.client) {
  await fetchNfts({ queryParameters: `/v3/aex141?limit=${limit.value}&direction=backward&by=creation` })
}

</script>
