<template>
  <app-panel class="oracle-events-panel">
    <paginated-content
      v-if="oracleEvents"
      :entities="oracleEvents"
      pagination-style="history"
      @prev-clicked="loadPrevEvents"
      @next-clicked="loadNextEvents">
      <oracle-events-table
        :oracle-events="oracleEvents"
        class="oracle-events-panel__table"/>

      <oracle-events-table-condensed
        :oracle-events="oracleEvents"
        class="oracle-events-panel__table-condensed"/>
    </paginated-content>
    <data-failed-state v-else/>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useOracleDetailsStore } from '@/stores/oracleDetails'
import OracleEventsTable from '@/components/OracleEventsTable'
import OracleEventsTableCondensed from '@/components/OracleEventsTableCondensed'
import DataFailedState from '~/components/DataFailedState'

const oracleDetailsStore = useOracleDetailsStore()
const { oracleEvents } = storeToRefs(oracleDetailsStore)
const { fetchOracleEvents } = oracleDetailsStore
const route = useRoute()

function loadPrevEvents() {
  fetchOracleEvents(oracleEvents.value.prev)
}

function loadNextEvents() {
  fetchOracleEvents(oracleEvents.value.next)
}

if (process.client) {
  const limit = computed(() => isDesktop() ? 10 : 3)
  await fetchOracleEvents(`/v2/oracles/${route.params.id}/responses?limit=${limit.value}`)
}
</script>

<style scoped>
.oracle-events-panel {
  padding: var(--space-3) var(--space-1) var(--space-4);
  margin-top: var(--space-2);

  @media (--desktop) {
    padding: var(--space-2) var(--space-4) var(--space-4);
  }

  &__table {
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
