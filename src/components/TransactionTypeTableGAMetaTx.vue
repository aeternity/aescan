<template>
  <table class="transaction-type-panel-ga-meta-tx__table">
    <tbody>
      <tr class="transaction-type-panel-ga-meta-tx__row">
        <th class="transaction-type-panel-ga-meta-tx__table-header">
          Sender
          <hint-tooltip>
            {{ transactionsHints.sender }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-ga-meta-tx__data">
          <app-link :to="`/accounts/${innerTransactionDetails.senderId}`">
            {{ innerTransactionDetails.senderId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-meta-tx__row">
        <th class="transaction-type-panel-ga-meta-tx__table-header">
          Recipient
          <hint-tooltip>
            {{ transactionsHints.recipient }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-ga-meta-tx__data">
          <app-link :to="`/accounts/${innerTransactionDetails.recipientId}`">
            {{ innerTransactionDetails.recipientId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-meta-tx__row">
        <th class="transaction-type-panel-ga-meta-tx__table-header">
          Amount
          <hint-tooltip>
            {{ transactionsHints.amount }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-ga-meta-tx__data">
          {{
            formatAePrice(
              formatAettosToAe(innerTransactionDetails.amount, null),
              null,
            )
          }}
        </td>
      </tr>
      <tr class="transaction-type-panel-ga-meta-tx__row">
        <th class="transaction-type-panel-ga-meta-tx__table-header">
          Payload
          <hint-tooltip>
            {{ transactionsHints.payload }}
          </hint-tooltip>
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
import { formatAePrice, formatAettosToAe, formatNullable } from '@/utils/format'
import AppLink from '@/components/AppLink'

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
    border-bottom: 1.5px solid var(--color-midnight-15);
  }

  &__data {
    word-wrap: break-word;
    text-align: right;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
