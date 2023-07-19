<template>
  <app-panel v-if="microblockTransactions">
    <!--    todo sanitize-->
    <!--    todo solve naming-->
    <paginated-content
      :entities="microblockTransactions"
      pagination-style="history"
      @prev-clicked="loadPrevMicroblockTransactions"
      @next-clicked="loadNextMicroblockTransactions">
      <microblock-transactions-table-2 :microblock-transactions="microblockTransactions"/>
    </paginated-content>
  </app-panel>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useMicroblockDetailsStore } from '@/stores/microblockDetails'

const microblockDetailsStore = useMicroblockDetailsStore()
const { microblockTransactions } = storeToRefs(microblockDetailsStore)
const { fetchMicroblockTransactions } = microblockDetailsStore

const route = useRoute()

function loadPrevMicroblockTransactions() {
  fetchMicroblockTransactions({ queryParameters: microblockTransactions.value.prev })
}

function loadNextMicroblockTransactions() {
  fetchMicroblockTransactions({ queryParameters: microblockTransactions.value.next })
}

if (process.client) {
  const limit = computed(() => isDesktop() ? 10 : 3)
  await fetchMicroblockTransactions({
    limit: limit.value,
    microblockHash: route.params.id,
  })
}
</script>
