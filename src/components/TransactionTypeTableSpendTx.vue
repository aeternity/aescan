<template>
  <table class="transaction-type-panel-spend-tx__table">
    <tbody>
      <tr class="transaction-type-panel-spend-tx__row">
        <th class="transaction-type-panel-spend-tx__table-header">
          Sender
          <hint-tooltip>
            {{ transactionsHints.sender }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-spend-tx__data">
          <app-link :to="`/accounts/${transactionData.senderId}`">
            <span class="u-hidden-mobile">
              {{ transactionData.senderId }}
            </span>
            <span class="u-hidden-desktop">
              {{ formatEllipseHash(transactionData.senderId) }}
            </span>
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-spend-tx__row">
        <th class="transaction-type-panel-spend-tx__table-header">
          Recipient
          <hint-tooltip>
            {{ transactionsHints.recipient }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-spend-tx__data">
          <app-link
            v-if="!transactionData.recipient"
            :to="`/accounts/${transactionData.recipientId}`">
            <span class="u-hidden-mobile">
              {{ transactionData.recipientId }}
            </span>
            <span class="u-hidden-desktop">
              {{ formatEllipseHash(transactionData.recipientId) }}
            </span>
          </app-link>
          <app-link
            v-else
            :to="`/accounts/${transactionData.recipient.account}`">
            {{ formatEllipseHash(transactionData.recipient.account) }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-spend-tx__row">
        <th class="transaction-type-panel-spend-tx__table-header">
          Amount
          <hint-tooltip>
            {{ transactionsHints.amount }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-spend-tx__data">
          <price-label
            :price="formatAettosToAe(transactionData.amount)"
            :max-digits="null"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-spend-tx__row">
        <th class="transaction-type-panel-spend-tx__table-header">
          Payload
          <hint-tooltip>
            {{ transactionsHints.payload }}
          </hint-tooltip>
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
import { formatAettosToAe, formatEllipseHash } from '@/utils/format'
import AppLink from '@/components/AppLink'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-spend-tx {
  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__label-link {
    text-decoration: none;
  }

  &__table {
    table-layout: fixed;
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-25);
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
