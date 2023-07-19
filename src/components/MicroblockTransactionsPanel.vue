<template>
  <app-panel class="microblock-transactions-panel">
    <!--    todo sanitize-->
    <!--    todo solve naming-->
    <paginated-content
      :entities="transactions"
      pagination-style="history"
      @prev-clicked="loadPrevMicroblockTransactions"
      @next-clicked="loadNextMicroblockTransactions">
      <microblock-transactions-table-2
        class="microblock-transactions-panel__table"
        :transactions="transactions"/>
      <microblock-transactions-table-condensed-2
        :transactions="transactions"
        class="microblock-transactions-panel__table-condensed"/>
    </paginated-content>
  </app-panel>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useMicroblockDetailsStore } from '@/stores/microblockDetails'

const microblockDetailsStore = useMicroblockDetailsStore()
const { microblockTransactions: transactions } = storeToRefs(microblockDetailsStore)
const { fetchMicroblockTransactions } = microblockDetailsStore

const route = useRoute()

function loadPrevMicroblockTransactions() {
  fetchMicroblockTransactions({ queryParameters: transactions.value.prev })
}

function loadNextMicroblockTransactions() {
  fetchMicroblockTransactions({ queryParameters: transactions.value.next })
}

if (process.client) {
  const limit = computed(() => isDesktop() ? 10 : 3)
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
