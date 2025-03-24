<template>
  <table>
    <tbody>
      <tr>
        <th>
          <hint-tooltip>
            {{ oraclesHints.oracleId }}
          </hint-tooltip>
          Oracle
        </th>
        <td>
          <app-link :to="`/oracles/${transactionData.oracleId}`">
            {{ transactionData.oracleId }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ oraclesHints.sender }}
          </hint-tooltip>
          Sender
        </th>
        <td>
          <app-link :to="`/accounts/${transactionData.senderId}`">
            {{ transactionData.senderId }}
          </app-link>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ oraclesHints.queryId }}
          </hint-tooltip>
          Query ID
        </th>
        <td>
          {{ formatNullable(transactionData.queryId) }}
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ oraclesHints.queryContent }}
          </hint-tooltip>
          Query
        </th>
        <td>
          {{ formatDecodeBase64(transactionData.query) }}
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ oraclesHints.queryFee }}
          </hint-tooltip>
          Query Fee
        </th>
        <td>
          <price-label :price="formatAettosToAe(transactionData.queryFee)"/>
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ oraclesHints.queryTtl }}
          </hint-tooltip>
          Query TTL / Type
        </th>
        <td>
          {{ transactionData.queryTtl.value }}
          /
          {{ transactionData.queryTtl.type }}
        </td>
      </tr>
      <tr>
        <th>
          <hint-tooltip>
            {{ oraclesHints.responseTtl }}
          </hint-tooltip>
          Response TTL / Type
        </th>
        <td>
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
@import url("../assets/styles/utilities/_detail-table.css");

.transaction-type-panel-oracle-query-tx {
  &__link {
    display: inline-flex;
    align-items: center;

    &:first-child {
      margin-right: var(--space-3);
    }
  }
}
</style>
