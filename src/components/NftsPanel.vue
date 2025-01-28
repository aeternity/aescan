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
const { nfts, nftsCount } = storeToRefs(useNftsStore())
const { fetchNfts, fetchNftsList } = useNftsStore()

const pageIndex = ref(1)
const limit = computed(() => process.client && isDesktop() ? 10 : 3)

async function loadPrevNfts() {
  await fetchNftsList({ queryParameters: nfts.value.prev })
}

async function loadNextNfts() {
  await fetchNftsList({ queryParameters: nfts.value.next })
}

if (process.client) {
  await fetchNfts({ queryParameters: `/aex141?limit=${limit.value}&direction=backward&by=creation` })
}

</script>
