<template>
  <app-panel>
    <paginated-content
      :entities="nftOwners"

      @next-clicked="loadNextNftowners"
      @prev-clicked="loadPrevNftowners">
      <nft-owners-table
        :owners="nftOwners"
        class="nft-owners-panel__table"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { nftOwners } = storeToRefs(useNftDetailsStore())
const { fetchNftOwners } = useNftDetailsStore()

async function loadNextNftowners() {
  await fetchNftOwners({ queryParameters: nftOwners.value.next.substring(3) })
}

async function loadPrevNftowners() {
  await fetchNftOwners({ queryParameters: nftOwners.value.prev.substring(3) })
}
</script>

<style scoped>
.nft-owners-panel__table {
  margin-bottom: var(--space-4);
}
</style>
