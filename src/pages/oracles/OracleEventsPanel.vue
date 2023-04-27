<template>
  <app-panel class="oracle-events-panel">
    <oracle-events-table
      :events="oracleEvents"
      class="oracle-events-panel__table"/>
  </app-panel>
</template>
<script setup>
// todo fix imports
import { storeToRefs } from 'pinia'
import { useOracleDetailsStore } from '@/stores/oracleDetails'
import OracleEventsTable from '~/pages/oracles/OracleEventsTable'

const oracleDetailsStore = useOracleDetailsStore()

const { oracleEvents } = storeToRefs(oracleDetailsStore)

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
