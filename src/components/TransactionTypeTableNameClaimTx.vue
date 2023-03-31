<template>
  <table class="transaction-type-panel-name-claim-tx__table">
    <tbody>
      <tr class="transaction-type-panel-name-claim-tx__row">
        <th class="transaction-type-panel-name-claim-tx__table-header">
          Name
        </th>
        <td class="transaction-type-panel-name-claim-tx__data">
          <app-link :to="`/names/${transactionData.name}`">
            {{ transactionData.name }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-name-claim-tx__row">
        <th class="transaction-type-panel-name-claim-tx__table-header">
          Claimer
        </th>
        <td class="transaction-type-panel-name-claim-tx__data">
          <app-link :to="`/accounts/${transactionData.account_id}`">
            {{ transactionData.account_id }}
          </app-link>
        </td>
      </tr>
      <tr class="transaction-type-panel-name-claim-tx__row">
        <th class="transaction-type-panel-name-claim-tx__table-header">
          Name fee
        </th>
        <td class="transaction-type-panel-name-claim-tx__data">
          {{
            formatAePrice(formatAettosToAe(transactionData.name_fee), null)
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import AppLink from '@/components/AppLink'
import { formatAePrice, formatAettosToAe } from '@/utils/format'

export default {
  name: 'TransactionTypeTableNameClaimTx',
  components: {
    AppLink,
  },
  props: {
    transactionData: {
      required: true,
      type: Object,
    },
  },
  methods: {
    formatAePrice,
    formatAettosToAe,
  },
}
</script>

<style scoped>
.transaction-type-panel-name-claim-tx {
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
