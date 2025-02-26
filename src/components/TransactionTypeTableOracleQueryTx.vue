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
          <app-link
            :to="`/oracles/${transactionData.oracleId}`">
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
          <app-link
            :to="`/accounts/${transactionData.senderId}`">
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
          {{ formatDecodeBase64(transactionData.query) }}
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
          <price-label :price="formatAettosToAe(transactionData.queryFee)"/>
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
    display: block;
    padding-bottom: 0;

    @media (--mobile) {
      padding-bottom: 8px;
      width: var(--detail-column-width);
      border-bottom: 1px solid var(--color-midnight-25);
      display: table-cell;
    }
  }

  &__row {
    display: block;

    @media (--mobile) {
      display: table-row;
    }
  }

  &__row:last-of-type &__table-header {
    border-bottom: 0;
  }

  &__data {
    display: block;
    padding-left: 28px;

    @media (--mobile) {
      display: table-cell;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }
}
</style>
