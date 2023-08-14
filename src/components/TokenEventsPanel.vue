<template>
  <app-panel class="token-events-panel">
    <paginated-content
      :entities="tokenEvents"
      pagination-style="history"
      @prev-clicked="loadPrevEvents"
      @next-clicked="loadNextEvents">
      <token-events-table
        v-if="tokenEvents"
        :token-events="tokenEvents"
        class="token-events-panel__table"/>
      <token-events-table-condensed
        v-if="tokenEvents"
        :token-events="tokenEvents"
        class="token-events-panel__table-condensed"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useTokenDetailsStore } from '@/stores/tokenDetails'
import TokenEventsTable from '@/components/TokenEventsTable.vue'
import TokenEventsTableCondensed from '@/components/TokenEventsTableCondensed.vue'

const { tokenEvents } = storeToRefs(useTokenDetailsStore())
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
.token-events-panel {
  margin-top: var(--space-2);
  /*todo move*/

  &__table {
    margin-bottom: var(--space-4);
    display: none;
    @media (--desktop) {
      display: revert;
    }
  }

  &__table-condensed {
    @media (--desktop) {
      display: none;
    }
  }
}
</style>
