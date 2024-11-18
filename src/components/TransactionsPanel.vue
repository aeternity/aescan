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
        <div class="transactions-panel__header">
          <transactions-select
            v-model="selectedTxType"
            class="transactions-panel__select"/>

          <transactions-range-picker
            v-model="selectedRange"
            class="u-hidden-mobile"/>
        </div>
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

const selectedRange = ref(CHART_INTERVALS_OPTIONS[4])

// todo differrent value

async function loadPrevTransactions() {
  await loadTransactions(transactions.value.prev)
}

async function loadNextTransactions() {
  await loadTransactions(transactions.value.next)
}

async function loadTransactions(queryParameters) {
  const { txType, scope } = route.query
  const txTypeOption = TX_TYPES_OPTIONS.find(option => option.typeQuery === txType)

  setSelectedTxType(txTypeOption || TX_TYPES_OPTIONS[0])
  await fetchTransactions({
    queryParameters,
    range: scope,
    type: selectedTxType.value.typeQuery,
    limit: limit.value,
  })
  await fetchTransactionsCount(selectedTxType.value.typeQuery)
  setPageIndex(1)
}

function changeRoute(selectedRange, selectedTxType) {
  const hasInterval = !!selectedRange.value.customInterval
  const hasType = !!selectedTxType.value.typeQuery

  const from = hasInterval ? DateTime.fromISO(selectedRange.value.customInterval.maxStart).toSeconds() : null
  const to = hasInterval ? DateTime.fromISO(selectedRange.value.customInterval.minStart).toSeconds() : null
  const intervalString = hasInterval ? `scope=time:${from}-${to}` : null
  const typeString = hasType ? `${'txType=' + selectedTxType.value.typeQuery}` : null

  const array = [intervalString, typeString]
  const slug = array ? `?${array.join('&')}` : null

  push(`/transactions${slug}`)
}

if (process.client) {
  watch(() => route.fullPath, () => {
    loadTransactions()
  })

  watch([selectedRange, selectedTxType], () => {
    changeRoute(selectedRange, selectedTxType)
  })

  if (!isHydrated?.value) {
    loadTransactions()
  }
}

</script>

<style>
.transactions-panel {
  &__select {
    margin-right: var(--space-1);
  }

  &__header {
    display: flex;
  }
}
</style>
