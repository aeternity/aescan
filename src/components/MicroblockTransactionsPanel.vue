<template>
  <app-panel class="microblock-transactions-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="transactions"
      :total-count="transactions?.count"
      pagination-style="history"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <template #header>
        <transactions-select v-model="selectedTxType"/>
      </template>
      <microblock-transactions-table :transactions="transactions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { TX_TYPES_OPTIONS } from '@/utils/constants'

const { microblockTransactions: transactions } = storeToRefs(useMicroblockDetailsStore())
const { fetchMicroblockTransactions } = useMicroblockDetailsStore()

const route = useRoute()
const { push } = useRouter()

const selectedTxType = ref(TX_TYPES_OPTIONS[0])
const pageIndex = ref(1)

function loadPrevTransactions() {
  fetchMicroblockTransactions({ queryParameters: transactions.value.prev.substring(3) })
}

function loadNextTransactions() {
  fetchMicroblockTransactions({ queryParameters: transactions.value.next.substring(3) })
}

async function loadTransactions() {
  const { txType } = route.query
  const txTypeOption = TX_TYPES_OPTIONS.find(option => option.typeQuery === txType)
  selectedTxType.value = txTypeOption || TX_TYPES_OPTIONS[0]
  await fetchMicroblockTransactions({
    limit: 10,
    microblockHash: route.params.id,
    type: selectedTxType.value?.typeQuery,
  })
  pageIndex.value = 1
}

if (process.client) {
  watch(() => route.fullPath, () => {
    loadTransactions()
  })
  watch(selectedTxType, () => {
    const typeQuery = selectedTxType.value?.typeQuery
    const slug = `${typeQuery ? '?txType=' + typeQuery : ''}`
    push(`/microblocks/${route.params.id}${slug}`)
  })

  loadTransactions()
}
</script>
