<template>
  <!--  todo fich chain line-->
  <app-panel class="keyblock-microblock-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      pagination-style="history"
      :entities="microblocks"
      :total-count="keyblockDetails.microBlocksCount"
      @prev-clicked="loadPrevMicroblocks"
      @next-clicked="loadNextMicroblocks">
      <keyblock-microblocks-table
        :microblocks="microblocks"
        class="keyblock-microblock-panel__table"/>
    </paginated-content>
  </app-panel>
</template>
<script setup>
const { keyblockMicroblocks: microblocks, keyblockDetails } = storeToRefs(useKeyblockDetailsStore())
const { fetchKeyblockMicroblocks } = useKeyblockDetailsStore()
const route = useRoute()

if (process.client) {
  fetchKeyblockMicroblocks({
    id: route.params.id,
  })
}

const pageIndex = ref(1)
const loadPrevMicroblocks = () =>
  fetchKeyblockMicroblocks(
    { queryParameters: microblocks.value.prev })
const loadNextMicroblocks = () =>
  fetchKeyblockMicroblocks(
    { queryParameters: microblocks.value.next })
</script>

<style scoped>
.keyblock-microblock-panel__table {
  margin-bottom: var(--space-4);
}
</style>
