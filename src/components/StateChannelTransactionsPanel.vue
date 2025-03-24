<template>
  <app-panel
    v-if="stateChannelTransactions"
    class="state-channel-transactions-panel">
    <paginated-content
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

function loadPrevTransactions() {
  fetchStateChannelTransactions(stateChannelTransactions.value.prev)
}

function loadNextTransactions() {
  fetchStateChannelTransactions(stateChannelTransactions.value.next)
}

if (process.client) {
  fetchStateChannelTransactions({ id: route.params.id })
}
</script>
