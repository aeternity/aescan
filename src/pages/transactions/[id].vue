<template>
  <div class="transaction-details">
    <Head>
      <Title>{{ APP_TITLE_SHORT }} | Transaction</Title>
    </Head>
    <div class="transaction-details__parallax">
      <page-header>
        Transaction
      </page-header>

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
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import TransactionGeneralPanel from '@/components/TransactionGeneralPanel'
import PageHeader from '@/components/PageHeader'
import { useTransactionDetailsStore } from '@/stores/transactionDetails'
import TransactionTypePanel from '@/components/TransactionTypePanel'
import TransactionPointersPanel from '@/components/TransactionPointersPanel'

const transactionDetailsStore = useTransactionDetailsStore()
const {
  transactionDetails,
  transactionTypeData,
} = storeToRefs(transactionDetailsStore)
const { fetchTransactionDetails } = transactionDetailsStore
const route = useRoute()

await fetchTransactionDetails(route.params.id)
</script>

<style scoped>
.transaction-details {
  background-image: url("@/assets/background.svg");
  background-color: var(--color-midnight-35);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &__parallax {
    padding: 120px var(--space-1) var(--space-6);
    max-width: var(--container-width);
    margin: 0 auto;
    @media (--desktop) {
      padding: 120px 0;
    }
  }

  &__panel {
    margin-bottom: var(--space-6);

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
