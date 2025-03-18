<template>
  <app-panel>
    <paginated-content
      pagination-style="history"
      :entities="nftInventory"
      @next-clicked="loadNextNftInventory"
      @prev-clicked="loadPrevNftInventory">
      <nft-inventory-table
        :nft-inventory="nftInventory"
        class="nft-inventory-panel__table"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { nftInventory } = storeToRefs(useNftDetailsStore())
const { fetchNftInventory } = useNftDetailsStore()

async function loadPrevNftInventory() {
  await fetchNftInventory({ queryParameters: nftInventory.value.prev.substring(3) })
}

async function loadNextNftInventory() {
  await fetchNftInventory({ queryParameters: nftInventory.value.next.substring(3) })
}

if (process.client) {
  await fetchNftInventory()
}
</script>

<style scoped>
.nft-inventory-panel__table {
  margin-bottom: var(--space-4);
}
</style>
