<template>
  <app-panel class="oracle-events-panel">
    <paginated-content
      :entities="oracleEvents"
      @prev-clicked="loadPrevEvents"
      @next-clicked="loadNextEvents">
      <oracle-events-table
        v-if="oracleEvents"
        :events="oracleEvents"
        class="oracle-events-panel__table"/>

      <oracle-events-table-condensed
        v-if="oracleEvents"
        :events="oracleEvents"
        class="oracle-events-panel__table-condensed"/>
    </paginated-content>
  </app-panel>
</template>
<script setup>
// todo fix imports
import { storeToRefs } from 'pinia'
import { useOracleDetailsStore } from '@/stores/oracleDetails'
import OracleEventsTable from '@/components/OracleEventsTable'
import OracleEventsTableCondensed from '@/components/OracleEventsTableCondensed'

const oracleDetailsStore = useOracleDetailsStore()

const { oracleEvents } = storeToRefs(oracleDetailsStore)
const { fetchOracleEvents } = oracleDetailsStore

function loadPrevEvents() {
  fetchOracleEvents({ queryParameters: oracleEvents.value.prev })
}

function loadNextEvents() {
  fetchOracleEvents({ queryParameters: oracleEvents.value.next })
}

if (process.client) {
  const limit = computed(() => isDesktop() ? 10 : 3)
  await fetchOracleEvents({
    limit: limit.value,
  })
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
