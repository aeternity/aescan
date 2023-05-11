<template>
  <table class="transaction-type-panel-channel-deposit-tx__table">
    <tbody>
      <tr class="transaction-type-panel-channel-deposit-tx__row">
        <th class="transaction-type-panel-channel-deposit-tx__table-header">
          Channel id
        </th>
        <td class="transaction-type-panel-channel-deposit-tx__data">
          {{ transactionData.channel_id }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-deposit-tx__row">
        <th class="transaction-type-panel-channel-deposit-tx__table-header">
          Round
        </th>
        <td class="transaction-type-panel-channel-deposit-tx__data">
          {{ transactionData.round }}
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-deposit-tx__row">
        <th class="transaction-type-panel-channel-deposit-tx__table-header">
          Depositor
        </th>
        <td class="transaction-type-panel-channel-deposit-tx__data">
          <app-link :to="`/accounts/${transactionData.from_id}`">
            {{ transactionData.from_id }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-channel-deposit-tx__row">
        <td>Amount</td>
        <td class="transaction-type-panel-channel-deposit-tx__data">
          {{ formatAePrice(formatAettosToAe(transactionData.amount), null) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import AppLink from '@/components/AppLink'
import { formatAePrice, formatAettosToAe } from '@/utils/format'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-channel-deposit-tx {
  &__table {
    table-layout: fixed;
  }

  &__table-header {
    border-bottom: 1px solid var(--color-midnight-15);
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
