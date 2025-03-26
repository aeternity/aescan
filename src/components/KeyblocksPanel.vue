<template>
  <app-panel>
    <paginated-content
      :entities="keyblocks"
      :total-count="keyblocksCount"
      @prev-clicked="loadPrevKeyblocks"
      @next-clicked="loadNextKeyblocks">
      <keyblocks-table :keyblocks="keyblocks"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { fetchKeyblocks } = useKeyblockStore()
const { keyblocks, keyblocksCount } = storeToRefs(useKeyblockStore())

async function loadPrevKeyblocks() {
  await fetchKeyblocks(keyblocks.value.prev)
}

async function loadNextKeyblocks() {
  await fetchKeyblocks(keyblocks.value.next)
}

if (process.client) {
  fetchKeyblocks()
}
</script>
