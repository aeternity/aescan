<template>
  <div class="names-active-panel">
    <paginated-content
      v-model:limit="pageLimit"
      card
      :entities="activeNames"
      :total-count="activeNamesCount"
      @prev-clicked="loadPrevNames"
      @next-clicked="loadNextNames">
      <names-active-table
        v-if="activeNames"
        :names="activeNames"/>
    </paginated-content>
  </div>
</template>

<script setup>
const { fetchActiveNames } = useNamesStore()
const { activeNames } = storeToRefs(useNamesStore())

const { activeNamesCount } = storeToRefs(useBlockchainStatsStore())

const pageLimit = usePageLimit('names-active')

watch(pageLimit, () => {
  fetchActiveNames({ limit: pageLimit.value })
})

function loadPrevNames() {
  return fetchActiveNames({ queryParameters: activeNames.value.prev })
}

function loadNextNames() {
  return fetchActiveNames({ queryParameters: activeNames.value.next })
}
</script>
