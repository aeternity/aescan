<template>
  <app-panel class="nft-templates-owners-panel">
    <paginated-content
      :entities="nftOwners"
      :limit="limit"
      @next-clicked="loadNextNftowners"
      @prev-clicked="loadPrevNftowners">
      <nft-templates-owners-table
        :owners="nftOwners"
        class="nft-templates-owners-panel__table u-hidden-mobile"/>
      <nft-templates-owners-table-condensed
        :owners="nftOwners"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { nftOwners } = storeToRefs(useNftDetailsStore())
const { fetchNftOwners } = useNftDetailsStore()

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

async function loadNextNftowners() {
  await fetchNftOwners({ queryParameters: nftOwners.value.next })
}

async function loadPrevNftowners() {
  await fetchNftOwners({ queryParameters: nftOwners.value.prev })
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
