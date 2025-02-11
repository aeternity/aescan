<template>
  <app-panel
    v-if="stateChannelTransactions"
    class="state-channel-transactions-panel">
    <paginated-content
      v-model:page-index="pageIndex"

      :total-count="stateChannelTransactionsCount"
      :entities="stateChannelTransactions"
      pagination-style="history"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <state-channel-transactions-table :transactions="stateChannelTransactions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
const { stateChannelTransactions, stateChannelTransactionsCount } = storeToRefs(useStateChannelDetailsStore())
const { fetchStateChannelTransactions } = useStateChannelDetailsStore()

const pageIndex = ref(1)

const loadPrevTransactions = () => {
  fetchStateChannelTransactions({
    queryParameters: stateChannelTransactions.value.prev,
  })
}

const loadNextTransactions = () => {
  fetchStateChannelTransactions({
    queryParameters: stateChannelTransactions.value.next,
  })
}

if (process.client) {
  fetchStateChannelTransactions({
    limit: 10,
  })
}
</script>
