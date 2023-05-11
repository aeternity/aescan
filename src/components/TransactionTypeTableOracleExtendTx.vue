<template>
  <table class="transaction-type-panel-oracle-extend-tx__table">
    <tbody>
      <tr class="transaction-type-panel-oracle-extend-tx__row">
        <th class="transaction-type-panel-oracle-extend-tx__table-header">
          Oracle
        </th>
        <td class="transaction-type-panel-oracle-extend-tx__data">
          <app-link :to="`/oracles/${transactionData.oracle_id}`">
            {{ transactionData.oracle_id }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-oracle-extend-tx__row">
        <th class="transaction-type-panel-oracle-extend-tx__table-header">
          Oracle TTL / type
        </th>
        <td class="transaction-type-panel-oracle-extend-tx__data">
          {{ transactionData.oracle_ttl.value }}
          /
          {{ transactionData.oracle_ttl.type }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  transactionData: {
    required: true,
    type: Object,
  },
})
</script>

<style scoped>
.transaction-type-panel-oracle-extend-tx {
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
