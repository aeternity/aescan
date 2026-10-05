<template>
  <div class="names-expired-panel">
    <paginated-content
      v-model:limit="pageLimit"
      card
      :entities="expiredNames"
      @prev-clicked="loadPrevNames"
      @next-clicked="loadNextNames">
      <names-expired-table
        v-if="expiredNames"
        :names="expiredNames"/>
    </paginated-content>
  </div>
</template>

<script setup>
const { fetchExpiredNames } = useNamesStore()
const { expiredNames } = storeToRefs(useNamesStore())

const pageLimit = usePageLimit('names-expired')

watch(pageLimit, () => {
  fetchExpiredNames({ limit: pageLimit.value })
})

function loadPrevNames() {
  fetchExpiredNames({ queryParameters: expiredNames.value.prev })
}

function loadNextNames() {
  fetchExpiredNames({ queryParameters: expiredNames.value.next })
}
</script>
