<template>
  <table class="transaction-type-panel-oracle-register-tx__table">
    <tbody>
      <tr class="transaction-type-panel-oracle-register-tx__row">
        <th class="transaction-type-panel-oracle-register-tx__table-header">
          Oracle
        </th>
        <td class="transaction-type-panel-oracle-register-tx__data">
          <app-link :to="`/oracles/${transactionData.oracle_id}`">
            {{ formatNullable(transactionData.oracle_id) }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-register-tx__row">
        <th class="transaction-type-panel-oracle-register-tx__table-header">
          Oracle Lifetime / type
        </th>
        <td class="transaction-type-panel-oracle-register-tx__data">
          {{ transactionData.oracle_ttl.value }}
          /
          {{ transactionData.oracle_ttl.type }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-register-tx__row">
        <th class="transaction-type-panel-oracle-register-tx__table-header">
          Query fee
        </th>
        <td class="transaction-type-panel-oracle-register-tx__data">
          {{
            formatAePrice(formatAettosToAe(transactionData.query_fee), null)
          }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-register-tx__row">
        <th class="transaction-type-panel-oracle-register-tx__table-header">
          Query format
        </th>
        <td class="transaction-type-panel-oracle-register-tx__data">
          {{ transactionData.query_format }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-register-tx__row">
        <th class="transaction-type-panel-oracle-register-tx__table-header">
          Response format
        </th>
        <td class="transaction-type-panel-oracle-register-tx__data">
          {{ transactionData.response_format }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { formatAePrice, formatAettosToAe, formatNullable } from '@/utils/format'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-oracle-register-tx {
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
