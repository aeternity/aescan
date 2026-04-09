<template>
  <app-panel>
    <paginated-content
      v-model:limit="pageLimit"
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
const route = useRoute()
const { nftOwners } = storeToRefs(useNftDetailsStore())
const { fetchNftOwners } = useNftDetailsStore()

const pageLimit = usePageLimit('nft-owners')

watch(pageLimit, () => {
  fetchNftOwners({ id: route.params.id, limit: pageLimit.value })
})

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
