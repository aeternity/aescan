<template>
  <app-panel class="keyblock-microblock-panel">
    <paginated-content
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

function loadPrevMicroblocks() {
  fetchKeyblockMicroblocks({ queryParameters: microblocks.value.prev })
}

function loadNextMicroblocks() {
  fetchKeyblockMicroblocks({ queryParameters: microblocks.value.next })
}
</script>

<style scoped>
.keyblock-microblock-panel__table {
  margin-bottom: var(--space-4);
}
</style>
