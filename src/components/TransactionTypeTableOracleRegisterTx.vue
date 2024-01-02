<template>
  <table class="transaction-type-panel-oracle-register-tx__table">
    <tbody>
      <tr class="transaction-type-panel-oracle-register-tx__row">
        <th class="transaction-type-panel-oracle-register-tx__table-header">
          Oracle
          <hint-tooltip>
            {{ oraclesHints.oracleId }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-oracle-register-tx__data">
          <app-link :to="`/oracles/${transactionData.oracleId}`">
            {{ formatNullable(transactionData.oracleId) }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-register-tx__row">
        <th class="transaction-type-panel-oracle-register-tx__table-header">
          Oracle TTL / Type
          <hint-tooltip>
            {{ oraclesHints.oracleTtl }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-oracle-register-tx__data">
          {{ transactionData.oracleTtl.value }}
          /
          {{ transactionData.oracleTtl.type }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-register-tx__row">
        <th class="transaction-type-panel-oracle-register-tx__table-header">
          Query Fee
          <hint-tooltip>
            {{ oraclesHints.queryFee }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-oracle-register-tx__data">
          <price-label
            :price="formatAettosToAe(transactionData.queryFee)"
            :max-digits="null"/>
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-register-tx__row">
        <th class="transaction-type-panel-oracle-register-tx__table-header">
          Query Format
          <hint-tooltip>
            {{ oraclesHints.queryFormat }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-oracle-register-tx__data">
          {{ transactionData.queryFormat }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-register-tx__row">
        <th class="transaction-type-panel-oracle-register-tx__table-header">
          Response Format
          <hint-tooltip>
            {{ oraclesHints.responseFormat }}
          </hint-tooltip>
        </th>
        <td class="transaction-type-panel-oracle-register-tx__data">
          {{ transactionData.responseFormat }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { oraclesHints } from '@/utils/hints/oraclesHints'
import { formatAettosToAe, formatNullable } from '@/utils/format'

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
