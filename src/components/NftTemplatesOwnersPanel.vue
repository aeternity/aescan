<template>
  <app-panel class="nft-templates-owners-panel">
    <paginated-content
      :entities="nftOwners"
      @next-clicked="loadNextNftowners"
      @prev-clicked="loadPrevNftowners">
      <nft-templates-owners-table
        :owners="nftOwners"
        class="nft-templates-owners-panel__table"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { nftOwners } = storeToRefs(useNftDetailsStore())
const { fetchNftOwners } = useNftDetailsStore()

async function loadNextNftowners() {
  await fetchNftOwners(nftOwners.value.next.substring(3))
}

async function loadPrevNftowners() {
  await fetchNftOwners(nftOwners.value.prev.substring(3))
}
</script>

<style scoped>
.nft-templates-owners-panel {
  background: var(--color-snow);
  font-size: 11px;
  line-height: 16px;

  @media (--desktop) {
    padding: var(--space-3) var(--space-4);
  }

  &__table {
    margin-bottom: var(--space-4);
  }
}
</style>
