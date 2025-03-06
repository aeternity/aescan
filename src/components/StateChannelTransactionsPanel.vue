<template>
  <app-panel
    v-if="stateChannelTransactions"
    class="state-channel-transactions-panel">
    <paginated-content
      v-model:page-index="pageIndex"
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
const pageIndex = ref(1)

const loadPrevTransactions = () => {
  fetchStateChannelTransactions(stateChannelTransactions.value.prev)
}

const loadNextTransactions = () => {
  fetchStateChannelTransactions(stateChannelTransactions.value.next)
}

if (process.client) {
  fetchStateChannelTransactions({ id: route.params.id })
}
</script>
