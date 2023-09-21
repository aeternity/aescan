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
        class="token-events-panel__table u-hidden-mobile"/>
      <token-events-table-condensed
        v-if="tokenEvents"
        :token-events="tokenEvents"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useTokenDetailsStore } from '@/stores/tokenDetails'
import TokenEventsTable from '@/components/TokenEventsTable.vue'
import TokenEventsTableCondensed from '@/components/TokenEventsTableCondensed.vue'

const { tokenEvents, tokenEventsCount } = storeToRefs(useTokenDetailsStore())
const { fetchTokenEvents, fetchTokenEventsCount } = useTokenDetailsStore()
const route = useRoute()

function loadPrevEvents() {
  fetchTokenEvents({ queryParameters: tokenEvents.value.prev })
}

function loadNextEvents() {
  fetchTokenEvents({ queryParameters: tokenEvents.value.next })
}

await fetchTokenEventsCount(route.params.id)

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
