<template>
  <table class="transaction-type-panel-spend-tx__table">
    <tbody>
      <tr class="transaction-type-panel-spend-tx__row">
        <th class="transaction-type-panel-spend-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.sender }}
          </hint-tooltip>
          Sender
        </th>
        <td class="transaction-type-panel-spend-tx__data">
          <app-link
            :to="`/accounts/${transactionData.senderId}`"
            has-break>
            {{ transactionData.senderId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-spend-tx__row">
        <th class="transaction-type-panel-spend-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.recipient }}
          </hint-tooltip>
          Recipient
        </th>
        <td class="transaction-type-panel-spend-tx__data">
          <app-link
            v-if="!transactionData.recipient"
            :to="`/accounts/${transactionData.recipientId}`"
            has-break>
            {{ transactionData.recipientId }}
          </app-link>
          <app-link
            v-else
            :to="`/accounts/${transactionData.recipient.account}`"
            has-break>
            {{ formatEllipseHash(transactionData.recipient.account) }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-spend-tx__row">
        <th class="transaction-type-panel-spend-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.amount }}
          </hint-tooltip>
          Amount
        </th>
        <td class="transaction-type-panel-spend-tx__data">
          <price-label :price="formatAettosToAe(transactionData.amount)"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-spend-tx__row">
        <th class="transaction-type-panel-spend-tx__table-header">
          <hint-tooltip>
            {{ transactionsHints.payload }}
          </hint-tooltip>
          Payload
        </th>
        <td class="transaction-type-panel-spend-tx__data">
          {{ decode(transactionData.payload) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { decode } from '@aeternity/aepp-sdk'
import { transactionsHints } from '@/utils/hints/transactionsHints'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-spend-tx {
  &__label-link {
    text-decoration: none;
  }

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
    white-space: wrap;
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }
}
</style>
