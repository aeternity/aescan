<template>
  <app-panel
    v-if="stateChannelTransactions"
    class="state-channel-transactions-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :limit="limit"
      :entities="stateChannelTransactions"
      pagination-style="history"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <state-channel-transactions-table
        class="state-channel-transactions-panel__table"
        :transactions="stateChannelTransactions"/>

      <state-channel-transactions-table-condensed
        class="state-channel-transactions-panel__table-condensed"
        :transactions="stateChannelTransactions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import AppPanel from '@/components/AppPanel'
import { useStateChannelDetailsStore } from '@/stores/stateChannelDetails'
import StateChannelTransactionsTable from '@/components/StateChannelTransactionsTable'
import StateChannelTransactionsTableCondensed from '@/components/StateChannelTransactionsTableCondensed'
import { isDesktop } from '@/utils/screen'
import PaginatedContent from '@/components/PaginatedContent'

const stateChannelDetailsStore = useStateChannelDetailsStore()
const { stateChannelTransactions } = storeToRefs(stateChannelDetailsStore)
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

<style scoped>
.state-channel-transactions-panel {
  padding: var(--space-4) var(--space-1);

  @media (--desktop) {
    padding: var(--space-4);
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
