<template>
  <app-panel class="transactions-panel">
    <paginated-content
      v-model:page-index="pageIndex"
      pagination-style="history"
      :entities="transactions"
      :total-count="transactionsCount"
      :limit="limit"
      @prev-clicked="loadPrevTransactions"
      @next-clicked="loadNextTransactions">
      <template #header>
        <transactions-select v-model="selectedTxType"/>

        <chart-controls
          v-model="selectedRange"
          class="u-hidden-mobile"/>
      </template>
      <transactions-table
        :transactions="transactions"
        class="u-hidden-mobile"/>
      <transactions-table-condensed
        :transactions="transactions"
        class="u-hidden-desktop"/>
    </paginated-content>
  </app-panel>
</template>

<script setup>
import { CHART_INTERVALS_OPTIONS, TX_TYPES_OPTIONS } from '@/utils/constants'

const { transactions, transactionsCount, isHydrated, pageIndex, selectedTxType } = storeToRefs(useTransactionsStore())
const { fetchTransactions, fetchTransactionsCount, setPageIndex, setSelectedTxType } = useTransactionsStore()

const route = useRoute()
const { push } = useRouter()

const limit = computed(() => process.client && isDesktop() ? 10 : 3)

async function loadPrevTransactions() {
  await fetchTransactions(transactions.value.prev)
}

async function loadNextTransactions() {
  await fetchTransactions(transactions.value.next)
}

async function loadTransactions() {
  const { txType } = route.query
  const txTypeOption = TX_TYPES_OPTIONS.find(option => option.typeQuery === txType)
  setSelectedTxType(txTypeOption || TX_TYPES_OPTIONS[0])
  await fetchTransactions(`/transactions?limit=${limit.value}${selectedTxType.value.typeQuery ? '&type=' + selectedTxType.value.typeQuery : ''}`)
  await fetchTransactionsCount(selectedTxType.value.typeQuery)
  setPageIndex(1)
}

const selectedRange = ref(CHART_INTERVALS_OPTIONS[4])
// const selectedRange = ref(props.range)
// const selectedTxType = ref(TX_TYPES_OPTIONS[0])

if (process.client) {
  watch(() => route.fullPath, () => {
    loadTransactions()
  })
  //
  // todo merge like this
  // watch([selectedRange, selectedTxType], async() => {
  //   await loadHashratetatistics()
  // })

  watch([selectedRange], async() => {
    console.log('selectedRange.value', selectedRange.value.customInterval.maxStart)
  })

  watch(selectedTxType, () => {
    const typeQuery = selectedTxType.value?.typeQuery
    const slug = `${typeQuery ? '?txType=' + typeQuery : ''}`
    push(`/transactions${slug}`)
  })

  if (!isHydrated?.value) {
    loadTransactions()
  }
}

//
// await useAsyncData(async() => {
//   await loadHashratetatistics()
//   return true
// })
//
//
//
// async function loadHashratetatistics() {
//   await fetchHashrateStatistics(
//     selectedRange.value.interval,
//     selectedRange.value.limit,
//     selectedRange.value.customInterval)
// }
</script>
