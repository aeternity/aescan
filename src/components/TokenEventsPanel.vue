<template>
  <app-panel class="token-events-panel">
    <paginated-content
      :entities="tokenEvents"
      pagination-style="history"
      :total-count="tokenEventsCount"
      @prev-clicked="loadPrevEvents"
      @next-clicked="loadNextEvents">
      <token-events-table
        v-if="tokenEvents"
        :token-events="tokenEvents"
        class="token-events-panel__table"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { tokenEvents, tokenEventsCount } = storeToRefs(useTokenDetailsStore())
const { fetchTokenEvents } = useTokenDetailsStore()

const route = useRoute()

function loadPrevEvents() {
  fetchTokenEvents({ queryParameters: tokenEvents.value.prev })
}

function loadNextEvents() {
  fetchTokenEvents({ queryParameters: tokenEvents.value.next })
}

if (process.client) {
  const limit = computed(() => isDesktop() ? 10 : 3)
  await fetchTokenEvents({
    limit: limit.value,
    contractId: route.params.id,
  })
}
</script>

<style scoped>
.token-events-panel__table {
  margin-bottom: var(--space-4);
}
</style>
