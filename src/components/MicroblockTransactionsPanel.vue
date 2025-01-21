<template>
  <app-panel class="microblock-transactions-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      :entities="transactions"
      pagination-style="history"
      :limit="limit"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <template #header>
        <transactions-select v-model="selectedTxType"/>
      </template>
      <microblock-transactions-table
        :transactions="transactions"
        class="u-hidden-mobile"/>
      <microblock-transactions-table-condensed
        :transactions="transactions"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { TX_TYPES_OPTIONS } from '@/utils/constants'

const { push } = useRouter()
// todo router toute
const microblockDetailsStore = useMicroblockDetailsStore()
const { microblockTransactions: transactions } = storeToRefs(microblockDetailsStore)
const { fetchMicroblockTransactions } = microblockDetailsStore

const selectedTxType = ref(TX_TYPES_OPTIONS[0])
const route = useRoute()
const pageIndex = ref(1)
const limit = computed(() => process.client && isDesktop() ? 10 : 3)

function loadPrevTransactions() {
  fetchMicroblockTransactions({ queryParameters: transactions.value.prev })
}

function loadNextTransactions() {
  fetchMicroblockTransactions({ queryParameters: transactions.value.next })
}

async function loadTransactions() {
  const { txType } = route.query
  const txTypeOption = TX_TYPES_OPTIONS.find(option => option.typeQuery === txType)
  selectedTxType.value = txTypeOption || TX_TYPES_OPTIONS[0]
  await fetchMicroblockTransactions({ queryParameters: `/v3/micro-blocks/${route.params.id}/transactions/?limit=${limit.value}${selectedTxType.value.typeQuery ? '&type=' + selectedTxType.value.typeQuery : ''}` })
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
