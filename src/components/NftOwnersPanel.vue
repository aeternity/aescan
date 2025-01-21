<template>
  <app-panel>
    <paginated-content
      :entities="nftOwners"
      :limit="limit"
      @next-clicked="loadNextNftowners"
      @prev-clicked="loadPrevNftowners">
      <nft-owners-table
        :owners="nftOwners"
        class="nft-owners-panel__table u-hidden-mobile"/>
      <nft-owners-table-condensed
        :owners="nftOwners"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const nftDetailsStore = useNftDetailsStore()
const { nftOwners } = storeToRefs(nftDetailsStore)
const { fetchNftOwners } = nftDetailsStore

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

async function loadNextNftowners() {
  await fetchNftOwners({ queryParameters: nftOwners.value.next })
}

async function loadPrevNftowners() {
  await fetchNftOwners({ queryParameters: nftOwners.value.prev })
}
</script>

<style scoped>
.nft-owners-panel__table {
  margin-bottom: var(--space-4);
}
</style>
