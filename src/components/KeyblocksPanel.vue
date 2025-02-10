<template>
  <app-panel>
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="keyblocks"
      :total-count="keyblocksCount"
      @prev-clicked="loadPrevKeyblocks"
      @next-clicked="loadNextKeyblocks">
      <keyblocks-table
        class="u-hidden-mobile"
        :keyblocks="keyblocks"/>
      <keyblocks-table-condensed
        class="u-hidden-desktop"
        :keyblocks="keyblocks"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { fetchKeyblocks } = useKeyblockStore()
const { keyblocks, keyblocksCount } = storeToRefs(useKeyblockStore())

const limit = computed(() => isDesktop() ? 10 : 3)
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
  fetchKeyblocks({ limit: limit.value })
}

</script>
