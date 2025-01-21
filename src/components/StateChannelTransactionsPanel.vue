<template>
  <app-panel
    v-if="stateChannelTransactions"
    class="state-channel-transactions-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :limit="limit"
      :total-count="stateChannelTransactionsCount"
      :entities="stateChannelTransactions"
      pagination-style="history"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <state-channel-transactions-table
        class="u-hidden-mobile"
        :transactions="stateChannelTransactions"/>

      <state-channel-transactions-table-condensed
        class="u-hidden-desktop"
        :transactions="stateChannelTransactions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStateChannelDetailsStore } from '@/stores/stateChannelDetails'
import { isDesktop } from '@/utils/screen'

const stateChannelDetailsStore = useStateChannelDetailsStore()
const { stateChannelTransactions, stateChannelTransactionsCount } = storeToRefs(stateChannelDetailsStore)
const { fetchStateChannelTransactions } = stateChannelDetailsStore

const limit = computed(() => isDesktop() ? 10 : 3)
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
    limit: limit.value,
  })
}
</script>
