<template>
  <app-panel>
    <paginated-content
      v-model:limit="pageLimit"
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
const route = useRoute()
const { nftInventory } = storeToRefs(useNftDetailsStore())
const { fetchNftInventory } = useNftDetailsStore()

const pageLimit = usePageLimit('nft-inventory')

watch(pageLimit, () => {
  fetchNftInventory({ id: route.params.id, limit: pageLimit.value })
})

async function loadPrevNftInventory() {
  await fetchNftInventory({ queryParameters: nftInventory.value.prev })
}

async function loadNextNftInventory() {
  await fetchNftInventory({ queryParameters: nftInventory.value.next })
}
</script>

<style scoped>
.nft-inventory-panel__table {
  margin-bottom: var(--space-4);
}
</style>
