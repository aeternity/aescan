<template>
  <table class="transaction-type-panel-oracle-query-tx__table">
    <tbody>
      <tr class="transaction-type-panel-oracle-query-tx__row">
        <th class="transaction-type-panel-oracle-query-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.oracleId }}
          </hint-tooltip>
          Oracle
        </th>
        <td class="transaction-type-panel-oracle-query-tx__data">
          <app-link :to="`/oracles/${transactionData.oracleId}`">
            {{ transactionData.oracleId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-query-tx__row">
        <th class="transaction-type-panel-oracle-query-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.sender }}
          </hint-tooltip>
          Sender
        </th>
        <td class="transaction-type-panel-oracle-query-tx__data">
          <app-link :to="`/accounts/${transactionData.senderId}`">
            {{ transactionData.senderId }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-query-tx__row">
        <th class="transaction-type-panel-oracle-query-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.queryId }}
          </hint-tooltip>
          Query ID
        </th>
        <td class="transaction-type-panel-oracle-query-tx__data">
          {{ formatNullable(transactionData.queryId) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-query-tx__row">
        <th class="transaction-type-panel-oracle-query-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.queryContent }}
          </hint-tooltip>
          Query
        </th>
        <td class="transaction-type-panel-oracle-query-tx__data">
          {{ transactionData.query }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-query-tx__row">
        <th class="transaction-type-panel-oracle-query-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.queryFee }}
          </hint-tooltip>
          Query Fee
        </th>
        <td class="transaction-type-panel-oracle-query-tx__data">
          {{ formatAePrice(formatAettosToAe(transactionData.queryFee), null) }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-query-tx__row">
        <th class="transaction-type-panel-oracle-query-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.queryTtl }}
          </hint-tooltip>
          Query TTL / Type
        </th>
        <td class="transaction-type-panel-oracle-query-tx__data">
          {{ transactionData.queryTtl.value }}
          /
          {{ transactionData.queryTtl.type }}
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-query-tx__row">
        <th class="transaction-type-panel-oracle-query-tx__table-header">
          <hint-tooltip>
            {{ oraclesHints.responseTtl }}
          </hint-tooltip>
          Response TTL / Type
        </th>
        <td class="transaction-type-panel-oracle-query-tx__data">
          {{ transactionData.responseTtl.value }}
          /
          {{ transactionData.responseTtl.type }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { oraclesHints } from '@/utils/hints/oraclesHints'
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
