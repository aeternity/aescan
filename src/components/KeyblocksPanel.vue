<template>
  <app-panel>
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="keyblocks"
      :total-count="keyblocksCount"
      @prev-clicked="loadPrevKeyblocks"
      @next-clicked="loadNextKeyblocks">
      <keyblocks-table :keyblocks="keyblocks"/>
    </paginated-content>
  </app-panel>
</template>
<!--todo pagination fix jako oracles-->

<script setup>
const { fetchKeyblocks } = useKeyblockStore()
const { keyblocks, keyblocksCount } = storeToRefs(useKeyblockStore())

const pageIndex = ref(1)

async function loadPrevKeyblocks() {
  await fetchKeyblocks({
    queryParameters: keyblocks.value.prev,
  })
}

async function loadNextKeyblocks() {
  await fetchKeyblocks({
    queryParameters: keyblocks.value.next,
  })
}

if (process.client) {
  fetchKeyblocks()
}

</script>
