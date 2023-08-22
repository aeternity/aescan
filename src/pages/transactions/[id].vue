<template>
  <Head>
    <Title>{{ APP_TITLE_SHORT }} | Transaction</Title>
  </Head>

  <page-header>
    Transaction

    <template #tooltip>
      {{ transactionsHints.transaction }}
    </template>
  </page-header>

  <loader-panel
    v-if="isLoading"
    class="transaction-details__panel"/>
  <transaction-general-panel
    v-else-if="transactionDetails"
    class="transaction-details__panel"
    :transaction-details="transactionDetails"/>

  <template v-if="!isSyncing">
    <transaction-type-panel
      v-if="transactionTypeData"
      class="transaction-details__panel"
      :transaction-data="transactionTypeData"/>

    <transaction-pointers-panel
      v-if="transactionTypeData?.pointers"
      class="transaction-details__panel"
      :transaction-data="transactionTypeData"/>
  </template>
  <loader-panel v-else/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'
import TransactionGeneralPanel from '@/components/TransactionGeneralPanel'
import PageHeader from '@/components/PageHeader'
import { useTransactionDetailsStore } from '@/stores/transactionDetails'
import { useWebSocket } from '@/stores/webSocket'
import { transactionsHints } from '@/utils/hints/transactionsHints'
import TransactionTypePanel from '@/components/TransactionTypePanel'
import TransactionPointersPanel from '@/components/TransactionPointersPanel'

const transactionDetailsStore = useTransactionDetailsStore()
const {
  transactionDetails,
  transactionTypeData,
} = storeToRefs(transactionDetailsStore)
const {
  fetchTransactionDetails,
} = transactionDetailsStore
const route = useRoute()
const { subscribedTransactionId } = storeToRefs(useWebSocket())
const { isLoading } = useLoading()

await fetchTransactionDetails(route.params.id)

const isSyncing = computed(() => isLoading.value || !transactionTypeData.value)

if (process.client && !transactionTypeData.value) {
  subscribedTransactionId.value = route.params.id

  onBeforeRouteUpdate(
    (_to, _from, next) => {
      subscribedTransactionId.value = null
      next()
    },
  )

  onBeforeRouteLeave(
    (_to, _from, next) => {
      subscribedTransactionId.value = null
      next()
    },
  )
}
</script>

<style scoped>
.transaction-details__panel {
  margin-bottom: var(--space-4);
  @media (--desktop) {
    margin-bottom: var(--space-6);
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
