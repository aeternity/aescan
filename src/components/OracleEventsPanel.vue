<template>
  <app-panel class="oracle-events-panel">
    <!--    todo pagination?-->
    <oracle-events-table
      :events="oracleEvents"
      class="oracle-events-panel__table"/>
    <oracle-events-table-condensed
      :events="oracleEvents"
      class="oracle-events-panel__table-condensed"/>
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

// function loadPrevHolders() {
//   fetchTokenHolders({ queryParameters: tokenHolders.value.prev })
// }
//
// function loadNextHolders() {
//   fetchTokenHolders({ queryParameters: tokenHolders.value.next })
// }

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
