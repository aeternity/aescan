<template>
  <app-panel class="names-expired-panel">
    <paginated-content
      v-model:limit="pageLimit"
      :entities="expiredNames"
      @prev-clicked="loadPrevNames"
      @next-clicked="loadNextNames">
      <names-expired-table
        v-if="expiredNames"
        class="names-expired-panel__names-expired-table"
        :names="expiredNames"/>
    </paginated-content>
  </app-panel>
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

<style scoped>
.names-expired-panel__names-expired-table {
  @media (--desktop) {
    margin-bottom: var(--space-4);
  }
}
</style>
