<template>
  <!--  oracleEvents {{ oracleEvents }}-->
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
const { oracleEvents } = storeToRefs(useOracleDetailsStore())
const { fetchOracleEvents } = useOracleDetailsStore()

const route = useRoute()
const pageIndex = ref(1)

function loadPrevEvents() {
  fetchOracleEvents({ queryParameters: oracleEvents.value.prev })
}

function loadNextEvents() {
  fetchOracleEvents({ queryParameters: oracleEvents.value.next })
}

if (process.client) {
  // todo pass params
  const limit = computed(() => isDesktop() ? 10 : 3)
  fetchOracleEvents({ limit, id: route.params.id })
}
</script>

<style scoped>
.oracle-events-panel__table {
  margin-bottom: var(--space-4);
}
</style>
