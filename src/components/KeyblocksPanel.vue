<template>
  <app-panel>
    <paginated-content
      v-model:limit="pageLimit"
      :entities="keyblocks"
      :total-count="keyblocksCount"
      pagination-style="history"
      @prev-clicked="loadPrevKeyblocks"
      @next-clicked="loadNextKeyblocks">
      <keyblocks-table :keyblocks="keyblocks"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { fetchKeyblocks } = useKeyblockStore()
const { keyblocks, keyblocksCount } = storeToRefs(useKeyblockStore())

const pageLimit = usePageLimit('keyblocks')

watch(pageLimit, () => {
  fetchKeyblocks({ limit: pageLimit.value })
})

async function loadPrevKeyblocks() {
  await fetchKeyblocks({ queryParameters: keyblocks.value.prev })
}

async function loadNextKeyblocks() {
  await fetchKeyblocks({ queryParameters: keyblocks.value.next })
}

if (import.meta.client) {
  fetchKeyblocks({ limit: pageLimit.value })
}
</script>
