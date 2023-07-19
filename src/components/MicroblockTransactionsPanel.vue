<template>
  <app-panel class="microblock-transactions-panel">
    <!--    todo sanitize-->
    <!--    todo solve naming-->
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="transactions"
      pagination-style="history"
      :total-count="microblockDetails.transactions_count"
      :limit="limit"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <microblock-transactions-table-2
        :transactions="transactions"
        class="microblock-transactions-panel__table"/>
      <microblock-transactions-table-condensed-2
        :transactions="transactions"
        class="microblock-transactions-panel__table-condensed"/>
    </paginated-content>
  </app-panel>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useMicroblockDetailsStore } from '@/stores/microblockDetails'
import PaginatedContent from '@/components/PaginatedContent'

const microblockDetailsStore = useMicroblockDetailsStore()
const { microblockTransactions: transactions, microblockDetails } = storeToRefs(microblockDetailsStore)
const { fetchMicroblockTransactions } = microblockDetailsStore

const route = useRoute()
const pageIndex = ref(1)
const limit = computed(() => process.client && isDesktop() ? 10 : 3)

function loadPrevTransactions() {
  fetchMicroblockTransactions({ queryParameters: transactions.value.prev })
}

function loadNextTransactions() {
  fetchMicroblockTransactions({ queryParameters: transactions.value.next })
}

if (process.client) {
  await fetchMicroblockTransactions({
    limit: limit.value,
    microblockHash: route.params.id,
  })
}
</script>

<style scoped>
.microblock-transactions-panel {
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
