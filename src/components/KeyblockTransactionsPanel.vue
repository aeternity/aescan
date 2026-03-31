<template>
  <app-panel class="keyblock-transactions-panel">
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
      <block-transactions-table
        v-if="transactions"
        :transactions="transactions"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { TX_TYPES_OPTIONS } from '@/utils/constants'

const { keyblockTransactions: transactions, keyblockDetails } = storeToRefs(useKeyblockDetailsStore())
const { fetchKeyblockTransactions } = useKeyblockDetailsStore()

const route = useRoute()
const { push } = useRouter()

const selectedTxType = ref(TX_TYPES_OPTIONS[0])
const pageIndex = ref(1)

function loadPrevTransactions() {
  fetchKeyblockTransactions({
    queryParameters: transactions.value.prev,
    height: keyblockDetails.value?.height,
    type: selectedTxType.value?.typeQuery,
  })
}

function loadNextTransactions() {
  fetchKeyblockTransactions({
    queryParameters: transactions.value.next,
    height: keyblockDetails.value?.height,
    type: selectedTxType.value?.typeQuery,
  })
}

async function loadTransactions() {
  const { txType } = route.query
  const txTypeOption = TX_TYPES_OPTIONS.find(option => option.typeQuery === txType)
  selectedTxType.value = txTypeOption || TX_TYPES_OPTIONS[0]
  await fetchKeyblockTransactions({
    height: keyblockDetails.value?.height,
    type: selectedTxType.value?.typeQuery,
  })
  pageIndex.value = 1
}

if (import.meta.client) {
  watch(() => route.fullPath, () => {
    loadTransactions()
  })
  watch(selectedTxType, () => {
    const typeQuery = selectedTxType.value?.typeQuery
    const slug = `${typeQuery ? '?txType=' + typeQuery : ''}`
    push(`/keyblocks/${route.params.id}${slug}`)
  })

  loadTransactions()
}
</script>
