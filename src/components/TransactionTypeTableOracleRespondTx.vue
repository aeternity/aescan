<template>
  <table class="transaction-type-panel-oracle-respond-tx__table">
    <tbody>
      <tr class="transaction-type-panel-oracle-respond-tx__row">
        <th class="transaction-type-panel-oracle-respond-tx__table-header">
          Oracle
        </th>
        <td class="transaction-type-panel-oracle-respond-tx__data">
          <app-link :to="`/oracles/${transactionData.oracle_id}`">
            {{ transactionData.oracle_id }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-respond-tx__row">
        <th class="transaction-type-panel-oracle-respond-tx__table-header">
          Query id
        </th>
        <td class="transaction-type-panel-oracle-respond-tx__data">
          {{ transactionData.query_id }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-respond-tx__row">
        <th class="transaction-type-panel-oracle-respond-tx__table-header">
          Response
        </th>
        <td class="transaction-type-panel-oracle-respond-tx__data">
          {{ formatDecodeByteArray(transactionData.response) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-respond-tx__row">
        <th class="transaction-type-panel-oracle-respond-tx__table-header">
          Response TTL / type
        </th>
        <td class="transaction-type-panel-oracle-respond-tx__data">
          {{ transactionData.response_ttl.value }}
          /
          {{ transactionData.response_ttl.type }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { formatDecodeByteArray } from '@/utils/format'

defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-oracle-respond-tx {
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
