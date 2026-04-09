<template>
  <app-panel
    v-if="stateChannelTransactions"
    class="state-channel-transactions-panel">
    <paginated-content
      v-model:limit="pageLimit"
      :total-count="stateChannelTransactions.count"
      :entities="stateChannelTransactions"
      pagination-style="history"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <state-channel-transactions-table :transactions="stateChannelTransactions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { stateChannelTransactions } = storeToRefs(useStateChannelDetailsStore())
const { fetchStateChannelTransactions } = useStateChannelDetailsStore()

const route = useRoute()

const pageLimit = usePageLimit('state-channel-transactions')

watch(pageLimit, () => {
  fetchStateChannelTransactions({ id: route.params.id, limit: pageLimit.value })
})

function loadPrevTransactions() {
  fetchStateChannelTransactions({ queryParameters: stateChannelTransactions.value.prev })
}

function loadNextTransactions() {
  fetchStateChannelTransactions({ queryParameters: stateChannelTransactions.value.next })
}

if (import.meta.client) {
  fetchStateChannelTransactions({ id: route.params.id, limit: pageLimit.value })
}
</script>
