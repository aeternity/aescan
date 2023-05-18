<template>
  <table class="transaction-type-panel-oracle-query-tx__table">
    <tbody>
      <tr class="transaction-type-panel-oracle-query-tx__row">
        <th class="transaction-type-panel-oracle-query-tx__table-header">
          Oracle
        </th>
        <td class="transaction-type-panel-oracle-query-tx__data">
          <app-link :to="`/oracles/${transactionData.oracle_id}`">
            {{ transactionData.oracle_id }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-query-tx__row">
        <th class="transaction-type-panel-oracle-query-tx__table-header">
          Sender
        </th>
        <td class="transaction-type-panel-oracle-query-tx__data">
          <app-link :to="`/accounts/${transactionData.sender_id}`">
            {{ transactionData.sender_id }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-query-tx__row">
        <th class="transaction-type-panel-oracle-query-tx__table-header">
          Query id
        </th>
        <td class="transaction-type-panel-oracle-query-tx__data">
          {{ formatNullable(transactionData.query_id) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-query-tx__row">
        <th class="transaction-type-panel-oracle-query-tx__table-header">
          Query
        </th>
        <td class="transaction-type-panel-oracle-query-tx__data">
          {{ transactionData.query }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-query-tx__row">
        <th class="transaction-type-panel-oracle-query-tx__table-header">
          Query fee
        </th>
        <td class="transaction-type-panel-oracle-query-tx__data">
          {{ formatAePrice(formatAettosToAe(transactionData.query_fee), null) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-query-tx__row">
        <th class="transaction-type-panel-oracle-query-tx__table-header">
          Query TTL / type
        </th>
        <td class="transaction-type-panel-oracle-query-tx__data">
          {{ transactionData.query_ttl.value }}
          /
          {{ transactionData.query_ttl.type }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-query-tx__row">
        <th class="transaction-type-panel-oracle-query-tx__table-header">
          Response TTL / type
        </th>
        <td class="transaction-type-panel-oracle-query-tx__data">
          {{ transactionData.response_ttl.value }}
          /
          {{ transactionData.response_ttl.type }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import AppLink from '@/components/AppLink'
import { formatAePrice, formatAettosToAe, formatNullable } from '@/utils/format'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-oracle-query-tx {
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
