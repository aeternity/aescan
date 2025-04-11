<template>
  <Head>
    <Title>Transaction</Title>
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
import { transactionsHints } from '@/utils/hints/transactionsHints'

const { transactionDetails, transactionTypeData } = storeToRefs(useTransactionDetailsStore())
const { fetchTransactionDetails } = useTransactionDetailsStore()

const { subscribedTransactionId } = storeToRefs(useWebSocket())

const route = useRoute()

const { isLoading } = useLoading()

const isSyncing = computed(() => isLoading.value || !transactionTypeData.value)

try {
  fetchTransactionDetails(route.params.id)
}
catch (error) {
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

if (import.meta.client && !transactionTypeData.value) {
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
