<template>
  <app-panel>
    <paginated-content
      pagination-style="history"
      :entities="nftInventory"
      :limit="limit"
      @next-clicked="loadNextNftInventory"
      @prev-clicked="loadPrevNftInventory">
      <nft-inventory-table
        :nft-inventory="nftInventory"
        class="nft-inventory-panel__table u-hidden-mobile"/>
      <nft-inventory-table-condensed
        :nft-inventory="nftInventory"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const nftDetailsStore = useNftDetailsStore()
const { nftInventory } = storeToRefs(nftDetailsStore)
const { fetchNftInventory } = nftDetailsStore

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

async function loadPrevNftInventory() {
  await fetchNftInventory({ queryParameters: nftInventory.value.prev })
}

async function loadNextNftInventory() {
  await fetchNftInventory({ queryParameters: nftInventory.value.next })
}

if (process.client) {
  await fetchNftInventory({ limit: limit.value })
}
</script>

<style scoped>
.nft-inventory-panel__table {
  margin-bottom: var(--space-4);
}
</style>
