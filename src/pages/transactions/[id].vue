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

  <template v-if="!isLoading">
    <transaction-general-panel
      v-if="transactionDetails"
      class="transaction-details__panel"
      :transaction-details="transactionDetails"/>

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
import TransactionGeneralPanel from '@/components/TransactionGeneralPanel'
import PageHeader from '@/components/PageHeader'
import { useTransactionDetailsStore } from '@/stores/transactionDetails'
import { transactionsHints } from '@/utils/hints/transactionsHints'
import TransactionTypePanel from '@/components/TransactionTypePanel'
import TransactionPointersPanel from '@/components/TransactionPointersPanel'

const transactionDetailsStore = useTransactionDetailsStore()
const {
  transactionDetails,
  transactionTypeData,
} = storeToRefs(transactionDetailsStore)
const { fetchTransactionDetails } = transactionDetailsStore
const route = useRoute()

const { isLoading } = useLoading()

try {
  await fetchTransactionDetails(route.params.id)
} catch (error) {
  if ([400, 404].includes(error.response?.status)) {
    throw showError({
      data: {
        entityId: route.params.id,
        entityName: 'Transaction',
      },
      statusMessage: 'EntityDetailsNotFound',
    })
  }

  throw error
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
