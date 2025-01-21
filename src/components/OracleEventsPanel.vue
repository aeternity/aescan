<template>
  <app-panel class="oracle-events-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="oracleEvents"
      pagination-style="history"
      @prev-clicked="loadPrevEvents"
      @next-clicked="loadNextEvents">
      <oracle-events-table
        :oracle-events="oracleEvents"
        class="oracle-events-panel__table u-hidden-mobile"/>

      <oracle-events-table-condensed
        :oracle-events="oracleEvents"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useOracleDetailsStore } from '@/stores/oracleDetails'

const oracleDetailsStore = useOracleDetailsStore()
const { oracleEvents } = storeToRefs(oracleDetailsStore)
const { fetchOracleEvents } = oracleDetailsStore
const route = useRoute()

const pageIndex = ref(1)

function loadPrevEvents() {
  fetchOracleEvents(oracleEvents.value.prev)
}

function loadNextEvents() {
  fetchOracleEvents(oracleEvents.value.next)
}

if (process.client) {
  const limit = computed(() => isDesktop() ? 10 : 3)
  fetchOracleEvents(`/v3/oracles/${route.params.id}/responses?limit=${limit.value}`)
}
</script>

<style scoped>
.oracle-events-panel__table {
  margin-bottom: var(--space-4);

}
</style>
