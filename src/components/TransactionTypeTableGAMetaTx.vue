<template>
  <table class="transaction-type-panel-ga-meta-tx__table">
    <tbody>
      <tr class="transaction-type-panel-ga-meta-tx__row">
        <th class="transaction-type-panel-ga-meta-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.sender }}
          </hint-tooltip>
          Sender
        </th>
        <td class="transaction-type-panel-ga-meta-tx__data">
          <app-link :to="`/accounts/${innerTransactionDetails.senderId}`">
            {{ innerTransactionDetails.senderId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-meta-tx__row">
        <th class="transaction-type-panel-ga-meta-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.recipient }}
          </hint-tooltip>
          Recipient
        </th>
        <td class="transaction-type-panel-ga-meta-tx__data">
          <app-link :to="`/accounts/${innerTransactionDetails.recipientId}`">
            {{ innerTransactionDetails.recipientId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-meta-tx__row">
        <th class="transaction-type-panel-ga-meta-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.amount }}
          </hint-tooltip>
          Amount
        </th>
        <td class="transaction-type-panel-ga-meta-tx__data">
          <price-label :price="formatAettosToAe(innerTransactionDetails.amount)"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-meta-tx__row">
        <th class="transaction-type-panel-ga-meta-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.payload }}
          </hint-tooltip>
          Payload
        </th>
        <td class="transaction-type-panel-ga-meta-tx__data">
          {{ payload }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { decode } from '@aeternity/aepp-sdk'
import { transactionsHints } from '@/utils/hints/transactionsHints'

const props = defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})

const innerTransactionDetails = computed(() =>
  props.transactionData.tx.tx,
)

const payload = computed(() =>
  formatNullable(decode(innerTransactionDetails.value.payload).toString()),
)
</script>

<style scoped>
.transaction-type-panel-ga-meta-tx {
  &__table {
    table-layout: fixed;
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);

    @media (--desktop) {
      width: var(--detail-column-width);
    }
  }

  &__data {
    word-wrap: break-word;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
